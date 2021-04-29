import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import React from "react";
import { FaEllo, FaGraduationCap } from "react-icons/fa";
import { Form } from "./Form";

import { UseModalContext } from "./Contexts/ModalContex";
import {
  Link,
  Router as BrowserRouter,
  Router,
  useHistory,
} from "react-router-dom";

interface Props {}

export const Introduction: React.FC = (props: Props) => {
  const { isOpen, onClose, onOpen } = UseModalContext();
  const history = useHistory();

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
        <Input
          placeholder="Pronađi instruktore"
          size="lg"
          background="white"
          w={"100%"}
        />
        <Button backgroundColor="black" color="white" size="lg">
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
