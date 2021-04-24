import { Image } from '@chakra-ui/image'
import { Box } from '@chakra-ui/layout'
import React from 'react'
import { LogInForm } from './LogInForm'
import { SignUpForm } from './SignUpForm'

import logo from '../images/logo.png'
import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/tabs'

interface Props {
    
}

export const Form : React.FC = (props: Props) => {
    return (
        <Box bg='gray.200'  p={3} boxShadow='sm' rounded='lg'>
            <Image src={logo} w='80px' mx='auto' my={6}/>
            <Tabs variant="enclosed-colored" isFitted m={4} defaultIndex={Number.parseInt(localStorage.getItem('login')!)}>
                <TabList w="90%" mx="auto" >
                    <Tab>Sign up</Tab>
                    <Tab active="true">Login</Tab>
                </TabList>
                <TabPanels mt={2}>
                    <TabPanel>
                        <SignUpForm/>
                    </TabPanel>
                    <TabPanel>
                        <LogInForm />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}
