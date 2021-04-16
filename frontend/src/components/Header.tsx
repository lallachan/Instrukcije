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

import logo from "../images/logo.png";

import {UseModalContext} from '../ModalContex'

interface Props {}

const Header = (props: Props) => {

  const {isOpen,onClose,onOpen} = UseModalContext()
  return (
   <>
   
      <HStack w="100%"  h="10vh" position="fixed" background="white" boxShadow="md">
        <Box w="90%"  ml="4" mt="2">
          <Image src={logo} boxSize="50px" />
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
