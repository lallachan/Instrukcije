import { VStack } from '@chakra-ui/layout';
import React from 'react';
import './App.css';
import { Footer } from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import SignUp from './components/SignUp';

function App() {
  return (
    <VStack className="App">
      <Header/>
      <LandingPage/>
      <Footer/>
      {/* <SignUp/> */}
    </VStack>
  );
}

export default App;
