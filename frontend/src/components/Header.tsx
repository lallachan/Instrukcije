import {
  background,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  ModalContextProvider,
  Spacer,
  Stack,
  useModalContext,
} from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Link, useHistory } from "react-router-dom";

import logo from "../images/logo.png";

import {UseModalContext} from '../ModalContex'

interface Props {}

const Header : React.FC = (props: Props) => {

  const {isOpen,onClose,onOpen} = UseModalContext()

  const history = useHistory()

  return (
   <>
   
      <HStack w="100%"  h="10vh" position="fixed" background="white" boxShadow="md" zIndex="100">
        <Box w="90%"  ml="4" mt="2">
         
          <Image src={logo} boxSize="50px" onClick={()=>history.push("/")}/>
         
        </Box>
        <Stack direction="row" spacing={4} p="2">
    
        <Button colorScheme="teal" variant="solid" onClick={()=>{localStorage.setItem('login','1') ;onOpen()}} >
            Log in
          </Button>
  
         
          <Button colorScheme="teal" variant="outline"  onClick={()=>{localStorage.setItem('login','0'); onOpen()}}>
            Sign up
          </Button>
        </Stack>
      </HStack>
   </>
  );
};

export default Header;
