import { Image, VStack } from '@chakra-ui/react'
import React from 'react'
import tutor from '../images/tutor.jpg'

interface Props {
    
}

const Aside : React.FC = (props: Props) => {
    return (
        <VStack
        w="50%"
        h="100%"
        >
        <Image src={tutor}
        w="100%"
        h="100%"
        objectFit="cover"
        alignSelf="end"
        />
        </VStack>
    )
}

export default Aside
