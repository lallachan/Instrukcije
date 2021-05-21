import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input, InputGroup } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React, { useState } from "react";
import { FaEllo, FaGraduationCap } from "react-icons/fa";
import { Form } from "./Form";

import { UseModalContext } from "./Contexts/ModalContex";
import {
  Link,
  Router as BrowserRouter,
  Router,
  useHistory,
} from "react-router-dom";
import axios from "axios";

interface Props {}

export const Introduction: React.FC = (props: Props) => {
  const { isOpen, onClose, onOpen } = UseModalContext();
  const history = useHistory();
  const [subject, setSubject] = useState("")
  const obj = {
    param : subject
  }

  function handleChange(e : any){
    setSubject(e.target.value)
     
  }

  async function handleSearch (){

  try {
    const res = await axios.post(process.env.REACT_APP_SERVER_CONNECT + "/api/search/",obj)
    console.log(res.data)
    history.push({
      pathname: '/search',
       state: { detail: res.data,subject }
    })
  } catch (error) {
    console.log(error)
  }

  }

  return (
    <VStack pl="8" maxW={{ sm: "100%",md:"100%",lg:"50%",xl:"50%" }}>
     <Heading
        alignSelf="flex-start"
        textAlign="left"
        fontSize={["60px", "60px", "100px", "100px"]}
      >
        Pronađi instruktora
      </Heading>
       
       <Box width="100%">
      <Heading
        textAlign="left"
        m ="0"  
        as= "h1"
        color="white"
        alignSelf="flex-start"
      >
        DANAS
      </Heading>
      </Box>


      
      <HStack w="100%" direction={["row", "row", "row", "row"]}>
        <InputGroup >
        <Input
          placeholder="Unesi predmet"
          size="lg"
          background="white"
          w={"100%"}
          onChange={(e)=>handleChange(e)}
          borderRightRadius="none"
        />

<Input
          placeholder="Unesi grad"
          borderLeftRadius="none"
          size="lg"
          background="white"
          w={"100%"}
        />
        
        </InputGroup>



        <Button backgroundColor="black" color="white" size="lg"
        onClick={handleSearch}
          


        >
          Kreni
        </Button>
      </HStack>
  
      <HStack w="100%" direction={["row", "row", "row", "row"]}>
        <Button
          backgroundColor="black"
          variant="solid"
          color="white"
          size="lg"
          p="2"
          alignSelf="flex-start"
          _hover={{
            backgroundColor:"white",
            color:"black",
          
            
          }}
          
          onClick={() => {
            history.push("/tutorSignUp");
          }}
        >
          Postani Instruktor 
          
      
        </Button>

      </HStack>
   
   
    </VStack>
  );
};
