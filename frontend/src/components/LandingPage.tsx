import { Stack, VStack } from "@chakra-ui/layout";
import React from "react";
import Cards from "./Cards";
import { Footer } from "./Footer";
import { Form } from "./Form";
import Header from "./Header";
import { LogInForm } from "./LogInForm";
import Main from "./Main";
import { SignUpForm } from "./SignUpForm";

const LandingPage: React.FC = () => {




  return (
    <VStack>
      
      <Main />
      <Cards />
     

    </VStack>
  );
};

export default LandingPage;
