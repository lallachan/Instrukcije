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

interface Props {}

const Header: React.FC = (props: Props) => {
  const { isOpen, onClose, onOpen } = UseModalContext();

  const history = useHistory();

  const { jwt, data, setJwt } = UseHeaderContext();

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
        <Box w="30%" mr="8" p="4" >
          <Image src={logo} boxSize="50px" onClick={() => history.push("/")} />
        </Box>
       

        <InputGroup w="40%">
        <Input
          placeholder="Pronađi instruktore"
          background="white"
          size="md"
          mx="auto"
        />
        <InputRightAddon children={<FaSearch/>}/>
        </InputGroup>

        <Box w="30%" textAlign="right" mr="8" p="4" mt="4">
        <Menu>
          <MenuButton>
            <Image src={avatar}   borderRadius="full" boxSize="50px"  />
          </MenuButton>
          <MenuList>
            <MenuItem onClick={()=>{history.push("/myPage")}}>Moj Profil</MenuItem>
            <MenuItem
              onClick={() => {
                setJwt("");
                localStorage.removeItem("token");
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


      

        {_.isEmpty(jwt) ? <LoggedInHeader /> : <LoggedOutHeader />}
      
    </>
  );
};

export default Header;
