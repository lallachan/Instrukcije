import { useDisclosure } from '@chakra-ui/hooks';
import { VStack } from '@chakra-ui/layout';
import React, { useContext } from 'react';
import './App.css';
import { Footer } from './components/Footer';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LogInSignUpModal from './components/LogInSignUpModal';
import SignUp from './components/SignUp';
import {ModalContext} from './ModalContex'



function App() {
  
  const {isOpen,onClose,onOpen} = useDisclosure()
  const modalValues = {
    isOpen,onClose,onOpen
  }


  return (
    <VStack className="App">
      <ModalContext.Provider value={modalValues}>
      <Header/>
      <LandingPage/>
      <Footer/>
      </ModalContext.Provider>
 
    
     
      {/* <SignUp/> */}
      <LogInSignUpModal isOpen={modalValues.isOpen} onClose={modalValues.onClose} onOpen={modalValues.onOpen}/>
    </VStack>
  );
  
}


export default App;
