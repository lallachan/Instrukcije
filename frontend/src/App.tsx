import { useDisclosure } from "@chakra-ui/hooks";
import { VStack } from "@chakra-ui/layout";
import React, { useContext } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import LogInSignUpModal from "./components/LogInSignUpModal";

import { ModalContext } from "./ModalContex";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
  Link,
} from "react-router-dom";
import { Button } from "@chakra-ui/button";
import TutorForm from "./components/TutorForm";
import TutorFormik from "./components/TutorFormik";

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const modalValues = {
    isOpen,
    onClose,
    onOpen,
  };

  return (
    


    <VStack className="App">
      <ModalContext.Provider value={modalValues}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/tutorSignUp" component={TutorForm} />
          </Switch>
          <Footer />
          <LogInSignUpModal
            isOpen={modalValues.isOpen}
            onClose={modalValues.onClose}
            onOpen={modalValues.onOpen}
          />
         
        </Router>
      </ModalContext.Provider>
    </VStack>
  );
}

export default App;
