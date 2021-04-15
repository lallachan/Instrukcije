import { Stack, VStack } from '@chakra-ui/layout'
import React from 'react'
import Cards from './Cards'
import { Footer } from './Footer'
import Header from './Header'
import Main from './Main'

const LandingPage : React.FC = () =>  {
    return (
        <VStack>
            <Header/>
            <Main/>
            <Cards/>
            <Footer/>
        </VStack>
    )
}

export default LandingPage
