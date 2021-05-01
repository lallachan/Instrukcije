import {
  Box,
  Button,
  Divider,
  Flex,
  Grid,
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

  }, [])



  return (
    <VStack w="100vw">
      <Heading mt="10">Most Popular</Heading>
      <Divider mb="10" />
 
      
      <Grid p="2" templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)","repeat(4, 1fr)"]} gap={4} w={["100%","100%","80%","80%"]}>
      
    
        {tutors.length===0?null:tutors.map((tutor) => {
          
          return (
          
            <Box
              key={tutor.id}
              border="1px solid teal"
              p="8"
              
            >
              <VStack>
                <Image
                  mt="8"
                  borderRadius="full"
                  boxSize=""
                  src="https://bit.ly/sage-adebayo"
                  alt="Segun Adebayo"
                />
                <Heading h="20">{tutor.firstName} {tutor.lastName}</Heading>
                <Text>
                  {tutor.tags.map((tag,indx)=>{
   
                   return  <Tag key={indx}>{tag}</Tag>
                  })}
                </Text>
                <Text justifyContent="center">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                  maiores ullam, enim aliquid dolorem veritatis facilis
                  perspiciatis ipsa deleniti doloribus obcaecati nobis provident
                  atque qui officiis beatae magnam veniam molestiae.


                </Text>
                  

                <Button colorScheme="teal" variant="solid" mt="10">
                  Više
                </Button>
               
              </VStack>
             
            </Box>
           
          );
        })}
      </Grid>
     
    </VStack>
  );
};

export default Cards;
