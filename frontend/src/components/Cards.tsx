import { Box, Button, Divider, Heading, HStack,Image,Spacer,Text, VStack } from '@chakra-ui/react'
import React from 'react'
import tutor1 from '../images/tutor1.jpg'

interface Props {
    
}

const Cards : React.FC = (props: Props) => {
    return (
        <VStack>
            <Heading mt="8">Most Popular</Heading>
            <Divider mb="10"/>
            <HStack>
               

                <Box w="30%"
                border="1px solid teal"
                borederRadius="20%"
                

                >
                <VStack>
                <Image
                mt="8"
                borderRadius="full"
                boxSize="150px"
                src="https://bit.ly/sage-adebayo"
                alt="Segun Adebayo"
                />
                <Heading>Ivan Ivankovic</Heading>
                <Text>
                    Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Saepe maiores ullam,
                     enim aliquid dolorem veritatis facilis
                      perspiciatis ipsa deleniti doloribus 
                      obcaecati nobis provident atque qui 
                      officiis beatae magnam veniam molestiae.
                </Text>
                <Button colorScheme="teal" variant="solid">
                More
                </Button>
                </VStack>
                
                </Box>

                <Box w="30%"
                border="1px solid teal"
                borederRadius="20%"
                

                >
                <VStack>
                <Image
                mt="8"
                borderRadius="full"
                boxSize="150px"
                src="https://bit.ly/sage-adebayo"
                alt="Segun Adebayo"
                />
                <Heading>Ivan Ivankovic</Heading>
                <Text>
                    Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Saepe maiores ullam,
                     enim aliquid dolorem veritatis facilis
                      perspiciatis ipsa deleniti doloribus 
                      obcaecati nobis provident atque qui 
                      officiis beatae magnam veniam molestiae.
                </Text>
                <Button colorScheme="teal" variant="solid">
                More
                </Button>
                </VStack>
                
                </Box>


                <Box w="30%"
                border="1px solid teal"
                borederRadius="20%"
                

                >
                <VStack>
                <Image
                mt="8"
                borderRadius="full"
                boxSize="150px"
                src="https://bit.ly/sage-adebayo"
                alt="Segun Adebayo"
                />
                <Heading>Ivan Ivankovic</Heading>
                <Text>
                    Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Saepe maiores ullam,
                     enim aliquid dolorem veritatis facilis
                      perspiciatis ipsa deleniti doloribus 
                      obcaecati nobis provident atque qui 
                      officiis beatae magnam veniam molestiae.
                </Text>
                <Button colorScheme="teal" variant="solid">
                More
                </Button>
                </VStack>
                
                </Box>


                <Box w="30%"
                border="1px solid teal"
                borederRadius="20%"
                

                >
                <VStack>
                <Image
                mt="8"
                borderRadius="full"
                boxSize="150px"
                src="https://bit.ly/sage-adebayo"
                alt="Segun Adebayo"
                />
                <Heading>Ivan Ivankovic</Heading>
                <Text>
                    Lorem ipsum dolor sit amet consectetur
                     adipisicing elit. Saepe maiores ullam,
                     enim aliquid dolorem veritatis facilis
                      perspiciatis ipsa deleniti doloribus 
                      obcaecati nobis provident atque qui 
                      officiis beatae magnam veniam molestiae.
                </Text>
                <Button colorScheme="teal" variant="solid">
                More
                </Button>
                </VStack>
                
                </Box>


               
               
                    
              

            </HStack>
        </VStack>
    )
}

export default Cards
