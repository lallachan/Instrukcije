import { Heading, HStack, Stack } from "@chakra-ui/react";
import React from "react";

interface Props {}

export const Footer: React.FC = (props: Props) => {
  return (
    <HStack backgroundColor="teal" w="100vw" h="100px" >
    <Heading mx="auto" as="h5">CopyRight &copy; 2021</Heading>
    </HStack>
  );
};
