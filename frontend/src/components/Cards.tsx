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
import { useHistory } from "react-router";
import tutor1 from "../images/tutor1.jpg";
import avatar from "../images/avatar.png";
import _ from "lodash";
interface Props {}

type Tutor = {
  _id : string,
  firstName: string,
  lastName : string,
  email : string,
  desc : string,
  tags : Array<String>,
  imageUrl : string
}

const Cards: React.FC = (props: Props) => {
  

  const [tutors, setTutors] = useState<Tutor[]>([])
  const history  = useHistory()

  useEffect(() => { 
    if(tutors.length===0)
  {  axios.get(process.env.REACT_APP_SERVER_CONNECT + "/api/landing")
    
    
    .then(res => {

      setTutors(res.data)
      
    }
      
      
      
    ).catch(err => console.log(err))}

  }, [])


  function gotoTutorPage(tutor : Tutor) {
    history.push(`/users/${tutor._id}`);
  }

  const cloudinary = "https://res.cloudinary.com/dbfwwnhat/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/" 

  return ( 
    <VStack w="100vw">
      <Heading mt="10">Most Popular</Heading>
      <Divider mb="10" />
 
      
      <Grid p="2" templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)","repeat(4, 1fr)"]} gap={4} w={["100%","100%","80%","80%"]}>
      
    
        {tutors.length===0?null:tutors.map((tutor) => {
          
          return (
          
            <Box
              key={tutor._id}
              border="1px solid teal"
              p="8"
              onClick={()=>gotoTutorPage(tutor)}
              
            >
              <VStack>
                <Image
                  mt="8"
                  borderRadius="full"
                  boxSize=""
                  src={_.isEmpty(tutor.imageUrl) ? avatar : cloudinary + tutor.imageUrl}
                  alt="Segun Adebayo"
                />
                <Heading h="20">{tutor.firstName} {tutor.lastName}</Heading>
                <Text>
                  {tutor.tags.map((tag,indx)=>{
   
                   return  <Tag key={indx}>{tag}</Tag>
                  })}
                </Text>
                <Text justifyContent="center">
                {tutor.desc}

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
