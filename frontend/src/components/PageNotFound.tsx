import Icon from '@chakra-ui/icon'
import { Container, Heading, HStack, Stack, Text } from '@chakra-ui/layout'
import React from 'react'
import { FaSadCry, FaSadTear, FaSmile } from 'react-icons/fa'

interface Props {
    
}

export const PageNotFound = (props: Props) => {
    return (
        <Container h="80vh">
       
        <Heading size="3xl" mt="20">
            404 Page Not Found
        <HStack textAlign="center" justifyContent="center" mt="10">
        <FaSadCry/><FaSadTear/>
        </HStack>
        
        
        </Heading>
        
     
        </Container>
    )
}
