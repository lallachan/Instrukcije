import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import { Input } from "@chakra-ui/input";
import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import React from "react";
import {FaEllo} from 'react-icons/fa'


interface Props {}

export const Introduction: React.FC = (props: Props) => {
  return (
    <VStack ml="4" w="50%">
      <Heading
      alignSelf="flex-start"
      fontSize="80px"
      >Pronađi instruktora</Heading>
      <Text
        as="h1"
        fontSize="90px"
        fontWeight="bold"
        color="white"
        alignSelf="flex-start"
      >
        DANAS
      </Text>
      <HStack w="100%">
        <Input placeholder="Pronađi instruktore" size="lg" background="white" />
        <Button backgroundColor="black" color="white" size="lg">
          Kreni
        </Button>
      </HStack>
      <HStack w="100%" >
        <Button colorScheme="teal" variant="solid" >
          Log in
        </Button>
        <Button colorScheme="teal" variant="solid" >
          Sign in
        </Button>
       
      </HStack>
      <Button backgroundColor="black" variant="solid" color="white" alignSelf="flex-start" size="lg" p="2">
          Become a Tutor
     
        </Button>
    </VStack>
  );
};
