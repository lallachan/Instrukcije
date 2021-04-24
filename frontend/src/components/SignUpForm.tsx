import {
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
  Stack,
  FormControl,
  Icon,
  Button,
  VStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaInfoCircle, FaLock } from "react-icons/fa";




type RegisterUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

interface Props {}

export const SignUpForm: React.FC = (props: Props) => {
  const { register, handleSubmit } = useForm<RegisterUser>();

  const [toggleEmailVal, seTtoggleEmailVal] = useState(false)

  const onSubmit = handleSubmit( async(data) => {

    try {
    

    const response = await axios.post(process.env.REACT_APP_SERVER_CONNECT + "" + process.env.REACT_APP_REGISTER_ROUTE, data)
    console.log(response)
    if (response.status == 200){
      seTtoggleEmailVal(true)
    }

    } catch (error) {
  
     console.log(error.response.data)
    }

  }
  
  );

  const EmailValidation: React.FC = (props: Props) => {

    return <VStack justifyContent="left" textAlign="left">
      <Heading>Email validacija</Heading>
      <Text>Poruka je poslana na vašu e-mail adresu.Molim vas kliknite na link i validirajte email.
        Ukoliko poruka nije došla, pričekajte par minuta.
        Ukoliko ne vidite poruku pogledajte vaše poruke (neželjena pošta).
      </Text>
    </VStack>
  }




  return (<>
    {toggleEmailVal? <EmailValidation/> : 
    <form onSubmit={onSubmit}>
      {/* TODO ADD VALIDATION */}
      <Stack spacing={4}>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<FaInfoCircle />} />
            <Input
              {...register("firstName")}
              bg="white"
              _hover={{ border: "2px solid teal" }}
              type="name"
              placeholder="First name"
              aria-label="First name"
            />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<FaInfoCircle />} />
            <Input
              {...register("lastName")}
              bg="white"
              _hover={{ border: "2px solid teal" }}
              type="name"
              placeholder="Last name"
              aria-label="Last name"
            />
          </InputGroup>
        </FormControl>
        <Divider borderColor="gray.300" />

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<FaEnvelope />} />
            <Input
              {...register("email")}
              bg="white"
              _hover={{ border: "2px solid teal" }}
              type="email"
              placeholder="Email"
              aria-label="Email"
            />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<FaLock />} />
            <Input
              {...register("password")}
              bg="white"
              _hover={{ border: "2px solid teal" }}
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </InputGroup>
        </FormControl>

        <Button
          type="submit"
          backgroundColor="teal"
          color="white"
          variant="solid"
          _hover={{ boxShadow: "md" }}
          _active={{ boxShadow: "lg" }}
        >
          Sign up!
        </Button>
        <br />
      </Stack>
    </form>

    }
    </>
  );
};
