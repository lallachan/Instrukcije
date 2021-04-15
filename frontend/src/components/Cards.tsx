import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import tutor1 from "../images/tutor1.jpg";

interface Props {}

const Cards: React.FC = (props: Props) => {
  const arr =[1,2,3,4]


  return (
    <VStack>
      <Heading mt="10">Most Popular</Heading>
      <Divider mb="10" />
 
      <Flex justify="space-evenly" p="20" direction={['column','column','column','row']}
    >
        {arr.map((el) => {
          return (
            <Box
              border="1px solid teal"
              borederRadius="20%"
              height="100%"
              p="10"
              
            >
              <VStack>
                <Image
                  mt="8"
                  borderRadius="full"
                  boxSize="150px"
                  src="https://bit.ly/sage-adebayo"
                  alt="Segun Adebayo"
                />
                <Heading>Ivan Ivankovic</Heading>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                  maiores ullam, enim aliquid dolorem veritatis facilis
                  perspiciatis ipsa deleniti doloribus obcaecati nobis provident
                  atque qui officiis beatae magnam veniam molestiae.
                </Text>
                <Button colorScheme="teal" variant="solid">
                  More
                </Button>
              </VStack>
            </Box>
           
          );
        })}
      </Flex>
    </VStack>
  );
};

export default Cards;
