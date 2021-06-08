import {
  background,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  ModalContextProvider,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Stack,
  useModalContext,
  VStack,
} from "@chakra-ui/react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import {
  BrowserRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

import logo from "../images/logo.png";
import { UseHeaderContext } from "./Contexts/HeaderContext";

import { UseModalContext } from "./Contexts/ModalContex";
import avatar from "../images/avatar.png";
import _ from "lodash";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {

}

const Header: React.FC = (props: Props) => {
  const { isOpen, onClose, onOpen } = UseModalContext();

  const history = useHistory();

  const { jwt, data, setJwt,setData} = UseHeaderContext();
  const cloudinary_url =   "https://res.cloudinary.com/dbfwwnhat/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/"
  const [image, setImage] = useState(avatar)
  const [subject, setSubject] = useState("")
  const obj = {
    param : subject
  }
  useEffect(() => {
    if(!  _.isEmpty(data.imageUrl)){
      setImage(cloudinary_url+data.imageUrl)
    }
  }, [data.imageUrl])

  function handleChange(e : any){
    setSubject(e.target.value)
     
  }

  async function handleSearch (){

  try {
    const res = await axios.post(process.env.REACT_APP_SERVER_CONNECT + "/api/search/",obj)
   
    history.push({
      pathname: '/search',
       state: { detail: res.data,subject }
    })
  } catch (error) {
    console.log(error)
  }

  }


  const LoggedInHeader: React.FC = () => {
    return (
      <>
      <HStack
        w="100vw"
        h="10vh"
        position="fixed"
        background="white"
        boxShadow="md"
        zIndex="100"
      >
        <Box  w={["30%","30%","30%","30%","30%"]} mr="8" p="4" >
          <Image src={logo} boxSize="50px" onClick={() => history.push("/")} />
        </Box>
       
    

        <Box w="80%" textAlign="right" mr="8" p="4" mt="4">
        <Menu>
          <MenuButton>
            <Image src={image}   borderRadius="full" boxSize="50px"  />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={()=>{history.push("/myPage")}}>Moj Profil</MenuItem>
            <MenuItem
              onClick={() => {
                setJwt("");
                localStorage.removeItem("token");
            
                setData({})
                history.push("/");
              }}
            >
              Odjava
            </MenuItem>
          </MenuList>
        </Menu>
        </Box>

        </HStack>
      </>
      
    );
  };

  const LoggedOutHeader: React.FC = () => {
    return (
      <HStack
      w="100vw"
      h="10vh"
      position="fixed"
      background="white"
      boxShadow="md"
      zIndex="100"
    >
      <Box w="94%" ml="4" mt="2">
        <Image src={logo} boxSize="50px" onClick={() => history.push("/")} />
      </Box>
      <Stack direction="row" spacing={4} p="4">
        <Button
          colorScheme="teal"
          variant="solid"
          onClick={() => {
            localStorage.setItem("login", "1");
            onOpen();
          }}
        >
          Log in
        </Button>

        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => {
            localStorage.setItem("login", "0");
            onOpen();
          }}
        >
          Sign up
        </Button>
      </Stack>
      </HStack>
    );
  };

  return (
    <>

        {_.isEqual("",jwt)? <LoggedOutHeader />: <LoggedInHeader /> }
      
    </>
  );
};

export default Header;
