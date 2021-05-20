import { Button } from '@chakra-ui/button'
import Icon from '@chakra-ui/icon'
import { Image } from '@chakra-ui/image'
import { Badge, Box, Container, Grid, Heading, Stack, Text, VStack } from '@chakra-ui/layout'
import { Tag } from '@chakra-ui/tag'
import _ from 'lodash'
import React, { useEffect } from 'react'
import { FaStar } from 'react-icons/fa'
import { useHistory } from 'react-router'
import avatar from "../images/avatar.png"
import UserStars from './Contexts/UserStars'
interface Props {
    
}

export const SearchPage = (props: Props) => {

   const history : any = useHistory()
    const tutors  = history.location.state.detail
   console.log(tutors)

    function truncateTest(text : string){
        if(text.length > 80){
            return text.substring(0,50) + "..."
        }
        return text
    }


    function Tutor(props:any){
        const {tutor} = props
        const cloudinary = "https://res.cloudinary.com/dbfwwnhat/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/" + tutor.imageUrl

        
    function gotoTutorPage(){

        history.push(`/users/${tutor._id}`)
    
        }
        return <>
         <Box
                borderRadius="xs"
              key={tutor.id}
              border="1px solid teal"
              p="2"
              backgroundColor="white"
              _hover={{backgroundColor:"teal.500",color:"white"}}
              onClick={gotoTutorPage}
            >
              <VStack>
            
            <Tag colorScheme="green"  borderRadius="full" backgroundColor="teal.100" p="2" justifySelf="right" fontSize="xl" mb="2">{tutor.price}kn/h</Tag>
          
          
            
             
                <Image
                  mt="8"
                  borderRadius="full"
                  boxSize="150px"
                  src={_.isEmpty(tutor.imageUrl) ? avatar : cloudinary}
                />
              
                <Heading>{tutor.firstName} {tutor.lastName}</Heading>
                <Stack>
                <UserStars rating={tutor.rating}/>
                </Stack>
               
              
                {/* <Text>
                  {tutor.tags.map((tag,indx)=>{
   
                   return  <Tag key={indx}>{tag}</Tag>
                  })}
                </Text> */}
                <Text justifyContent="center" w="3xs" h="100px" >
                  {truncateTest(tutor.desc)}


                </Text>
                  

                <Button colorScheme="teal" variant="solid" mt="10">
                  Više
                </Button>
               
              </VStack>
             
            </Box>
        </>
    }



    return (
        <React.Fragment>
           

            <Stack  w="100vw"  backgroundColor="#E2E8F0">
            <Grid p="2"   mx="auto" templateColumns={["repeat(1, 1fr)","repeat(2, 1fr)","repeat(2, 1fr)","repeat(4, 1fr)"]} gap={4} w={["100%","100%","80%","80%"]}>
      
    
        {tutors.length===0?null:tutors.map((tutor : any) => {
          
          return (
                <Tutor tutor={tutor}/>
               
           
          );
        })}

{tutors.length===0?null:tutors.map((tutor : any) => {
          
          return (
                <Tutor tutor={tutor}/>
               
           
          );
        })}

{tutors.length===0?null:tutors.map((tutor : any) => {
          
          return (
                <Tutor tutor={tutor}/>
               
           
          );
        })}

      </Grid>
      </Stack>
        </React.Fragment>
    )
}
