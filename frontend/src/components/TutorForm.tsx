import { Heading, VStack } from '@chakra-ui/react'
import React from 'react'

interface Props {
    
}

const TutorForm : React.FC = (props: Props) => {
    return (
        <VStack>
            <Heading mt="20">This is a tutor form</Heading>
        </VStack>
    )
}

export default TutorForm
