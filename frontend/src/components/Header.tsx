import {
  background,
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Image,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import logo from "../images/logo.png";

interface Props {}

const Header = (props: Props) => {
  return (
   <>
      <HStack w="100%"  h="10vh" position="fixed" background="white" boxShadow="md">
        <Box w="90%"  ml="4" mt="2">
          <Image src={logo} boxSize="50px" />
        </Box>
        <Stack direction="row" spacing={4} p="2">
          <Button colorScheme="teal" variant="solid">
            Log in
          </Button>
          <Button colorScheme="teal" variant="outline">
            Sign up
          </Button>
        </Stack>
      </HStack>
   </>
  );
};

export default Header;
