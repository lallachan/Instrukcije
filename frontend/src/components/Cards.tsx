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
  Tag,
  TagCloseButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaThermometerThreeQuarters } from "react-icons/fa";
import tutor1 from "../images/tutor1.jpg";

interface Props {}

type Tutor = {
  id : string,
  firstName: string,
  lastName : string,
  email : string,
  desc : string,
  tags : Array<String>
}

const Cards: React.FC = (props: Props) => {
  

  const [tutors, setTutors] = useState<Tutor[]>([])


  useEffect(() => { 
    if(tutors.length===0)
  {  axios.get(process.env.REACT_APP_SERVER_CONNECT + "/api/landing")
    
    
    .then(res => {

      setTutors(res.data)

    }
      
      
      
    ).catch(err => console.log(err))}

  }, [tutors])



  return (
    <VStack>
      <Heading mt="10">Most Popular</Heading>
      <Divider mb="10" />
 
      
      <Flex  justify="center" p="20" w="100%" direction={['column','column','column','row']}
      
    >
        {tutors.length===0?null:tutors.map((tutor) => {
          console.log(tutor)
          return (
          
            <Box
              key={tutor.id}
              border="1px solid teal"
              borederRadius="20%"
              height="100%"
              p="10"
              w={{sm:"100%"}}
              
              
            >
              <VStack>
                <Image
                  mt="8"
                  borderRadius="full"
                  boxSize="150px"
                  src="https://bit.ly/sage-adebayo"
                  alt="Segun Adebayo"
                />
                <Heading>{tutor.firstName} {tutor.lastName}</Heading>
                <Text>
                  {tutor.tags.map((tag,indx)=>{
   
                   return  <Tag key={indx}>{tag}</Tag>
                  })}
                </Text>
                <Text >
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
