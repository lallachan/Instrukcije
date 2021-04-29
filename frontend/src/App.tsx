import { useDisclosure } from "@chakra-ui/hooks";
import { VStack } from "@chakra-ui/layout";
import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import LogInSignUpModal from "./components/LogInSignUpModal";

import { ModalContext } from "./components/Contexts/ModalContex";
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
import { HeaderContext } from "./components/Contexts/HeaderContext";
import UserPage from "./components/UserPage";
import axios from "axios";
import { PageNotFound } from "./components/PageNotFound";
import _ from "lodash";

function App() {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [data, setData] = useState({})
  const [jwt, setJwt] = useState("")



  useEffect(() => {
    checkJwt(jwt)
  }, [])

  async function checkJwt(jwt : string){
    

    //ADD TO LOCAL STORAGE
    const verify_JWT = localStorage.getItem("token")
    if(_.isNull(verify_JWT)){ return}


    try {
     
      await axios.get(process.env.REACT_APP_SERVER_CONNECT+"/api/user/checkToken",{headers:{
        "auth-token":verify_JWT
      }})
  
      setJwt(verify_JWT+"")
    } catch (error) {
      console.log(error.response.data)
    }
  
    
  }


  function jwtSETTER(jwt:string){
    localStorage.setItem("token",jwt)
    setJwt(jwt)
  }

  const userData ={
    data, setData,
    jwt,setJwt: jwtSETTER
  }

  const modalValues = {
    isOpen,
    onClose,
    onOpen,
  };




  return (
    

    <VStack className="App">
      <HeaderContext.Provider value={userData}>
      <ModalContext.Provider value={modalValues}>
        <Router>
          <Header  />
          <div style={{marginTop:"10vh"}}>
          <Switch >
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/tutorSignUp" component={TutorForm} />
            {   !_.isEqual("",jwt)   && 
              <Route exact path="/myPage" component={UserPage} />
              
            }
            <Route component={PageNotFound} />
          </Switch>
          </div>
          <Footer />
          <LogInSignUpModal
            isOpen={modalValues.isOpen}
            onClose={modalValues.onClose}
            onOpen={modalValues.onOpen}
          /> 
        </Router>
      </ModalContext.Provider>
      </HeaderContext.Provider>
    </VStack>
  );
}

export default App;
