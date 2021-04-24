import { Heading, VStack } from '@chakra-ui/layout'
import React from 'react'

interface Props {
    
}

const UserPage : React.FC = (props: Props) => {
    return (
        <VStack h="100vh">
            <Heading mt="20">Welcome!</Heading>
        </VStack>
    )
}

export default UserPage
