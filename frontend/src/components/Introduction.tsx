import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import {FaEllo} from 'react-icons/fa'


interface Props {}

export const Introduction: React.FC = (props: Props) => {
  return (
    <VStack ml="4" maxW={{base:'90vw',sm:'80vw',lg:'50vw',xl:'40vw'}}>
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
        <Button colorScheme="teal" variant="solid" >
          Log in
        </Button>
        <Button colorScheme="teal" variant="solid" >
          Sign up
        </Button>
        <Button backgroundColor="black" variant="solid" color="white" alignSelf="flex-start"  p="2">
          Postani Instruktor
     
        </Button>
       
      </HStack>

      
     
    </VStack>
  );
};
