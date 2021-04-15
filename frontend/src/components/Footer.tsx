import { Heading, HStack, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const Footer: React.FC = (props: Props) => {
  return (
    <HStack backgroundColor="teal" w="100%" h="100px" >
    <Heading>CopyRight &copy; 2021</Heading>
    </HStack>
  );
};
