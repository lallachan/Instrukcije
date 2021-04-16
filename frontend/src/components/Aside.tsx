import { Image, VStack } from '@chakra-ui/react'
import React from 'react'
import tutor from '../images/tutor.jpg'

interface Props {
    
}

const Aside : React.FC = (props: Props) => {
    return (
        <VStack
        h="100%"
        width={{ base:"50%",xl:"50%", lg:"50%", md: "0%" ,sm: "0%"}}
       
        >
        <Image src={tutor}
        w="100%"
        h="100%"
        objectFit="cover"
        alignSelf="end"
        display={['none','none','inline-block','inline-block']}
        />
        </VStack>
    )
}

export default Aside
