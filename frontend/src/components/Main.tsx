import { Box, CSSReset, HStack, VStack } from '@chakra-ui/react'
import React from 'react'
import Aside from './Aside'
import Cards from './Cards'
import { Introduction } from './Introduction'

interface Props {
    
}

const Main : React.FC = (props: Props) => {
    return (
    
        <HStack background="teal" w="100%" h="100vh">
           
            <Introduction/>
            <Aside/>
        </HStack>
     
    )
}

export default Main
