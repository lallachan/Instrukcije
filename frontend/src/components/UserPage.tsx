import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import {
  Box,
  Divider,
  Heading,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import {
  FaCommentAlt,
    FaDollarSign,
  FaMapMarker,
  FaMapMarkerAlt,
  FaStar,
  FaUser,
} from "react-icons/fa";
import image from "../images/profileImage.jpg";

interface Props {}

const UserPage: React.FC = (props: Props) => {
  const arr = [1, 2, 3, 5];

    // useEffect(() => {
    //    if(data == ""){
        
    //    }
    // }, [])


  return (
    <Stack h="300vh" w="100vw" direction="row">
      {/* <Heading mt="20">Dobrodošli!</Heading> */}

      <VStack w="30%" mt="20">
        <Box boxSize="sm">
          <Image src={image} />

          <Divider mt="10" />

          <Stack mt="10">
            <Heading textAlign="left">Kratki Opis</Heading>
            <Text textAlign="left">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A harum
              laboriosam magnam officia? Repellendus totam impedit maiores hic
              cumque delectus ea, reprehenderit amet officia? Minus ut facere
              earum laudantium accusantium!
            </Text>
          </Stack>

          <Stack mt="10">
            <Heading textAlign="left">Posao</Heading>
            <Text textAlign="left">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A harum
              laboriosam magnam officia? Repellendus totam impedit maiores hic
              cumque delectus ea, reprehenderit amet officia? Minus ut facere
              earum laudantium accusantium!
            </Text>
          </Stack>

          <Divider mt="10" />

          <UnorderedList mt="10">
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </UnorderedList>
        </Box>
      </VStack>

      <VStack
        w="40%"
       
        textAlign="left"
        justifyContent="left"
        
      >
        <Stack  w="100%" mt="70px" p="10" spacing={6}>
          <HStack>
            <Heading as="h2" size="2xl">
              Ivan Rakitić
            </Heading>

            <Stack w="50%" direction="row">
              <Icon w={8} h={8} children={<FaMapMarkerAlt />}></Icon>
              <Text>Zagreb,Croatia</Text>
            </Stack>
          </HStack>

          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
                    <Tag w="100%" h="10" size="lg">Matematika</Tag>
                    <Tag w="100%" h="10" size="lg">Fizika</Tag>
                    <Tag w="100%" h="10" size="lg" >Hrvatski</Tag>
                    <Tag w="100%" h="10" size="lg" >Hrvatski</Tag>
                    <Tag w="100%" h="10" size="lg" >Hrvatski</Tag>
                    </Grid>

          <Text>Rang</Text>
          <HStack w="100%">
            <Heading w="20%">8,6</Heading>

            {arr.map((star) => {
              return <Icon w={10} h={10} color="teal" children={<FaStar />} />;
            })}
            <Icon w={10} h={10} color="black" children={<FaStar />} />
          </HStack>

          <HStack w="100%" mt="20" spacing={4}>
            <Button w="50%" p="4"  size="lg">
              <Icon w={6} h={6} color="black" children={<FaCommentAlt />} />
              Send Message
            </Button>
            
           
          </HStack>
        </Stack>

     
       
        <Divider/>
       
            
        
              <VStack textAlign="left" alignContent="left" >
                  <Stack spacing={4} w="100%" textAlign="left" justifyContent="left" alignContent="left">
                  <Text>Phone : +385 9378543324</Text>
                  <Text>Address : 2826  Del Dew Drive </Text>
                  <Text>Email : z4599ug0ay@temporary-mail.net</Text>
                  <Text>www.google.com</Text>
                  
                  
                  


                  <Text><FaDollarSign/>100kn/h</Text>
                  </Stack>



                    
                  
              </VStack>
       
            
            

           
              
             
        
            
         
   
      </VStack>
    </Stack>
  );
};

export default UserPage;
