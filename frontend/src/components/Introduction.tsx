import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay } from "@chakra-ui/modal";
import React from "react";
import {FaEllo} from 'react-icons/fa'
import { Form } from "./Form";

import {UseModalContext} from '../ModalContex'
import { Link, Router as BrowserRouter, Router, useHistory } from "react-router-dom";


interface Props {}

export const Introduction: React.FC = (props: Props) => {

  const {isOpen,onClose,onOpen} = UseModalContext()
  const history = useHistory()

  return (
    <VStack ml="4" maxW={{sm:'80vw'}}>
      <Heading
      alignSelf="flex-start"
      textAlign="left"
      fontSize={["60px","60px","100px","100px"]}
      >Pronađi instruktora</Heading>
      <Text
        as="h1"
        fontSize={["70px","70px","100px","100px"]}
        fontWeight="bold"
        color="white"
        alignSelf="flex-start"
      >
        DANAS
      </Text>
      <HStack w="100%"  direction={['row','row','row','row']}>
        <Input placeholder="Pronađi instruktore" size="lg" background="white" w={['100%']}/>
        <Button backgroundColor="black" color="white" size="lg">
          Kreni
        </Button>
      </HStack>
      <HStack w="100%" direction={['row','row','row','row']}>
        <Button colorScheme="teal" variant="solid"  onClick={()=>{localStorage.setItem('login','1') ;onOpen()}}>
          Log in
        </Button>
        <Button colorScheme="teal" variant="solid"  onClick={()=>{localStorage.setItem('login','0') ;onOpen()}}>
          Sign up
        </Button>
       
      
     
        <Button backgroundColor="black" variant="solid" color="white" alignSelf="flex-start"  p="2" onClick={()=>{
          history.push("/tutorSignUp")
        }}>
          Postani Instruktor
     
        </Button>
     
       
        
       
      </HStack>

      
     
    </VStack>
  );
};
