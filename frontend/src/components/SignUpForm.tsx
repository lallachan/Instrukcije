import {
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
  Stack,
  FormControl,
  Icon,
  Button,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";

import React from "react";
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

  const onSubmit = handleSubmit( async(data) => {

    try {
    
    console.log(data)
    const response = await axios.post(process.env.REACT_APP_SERVER_CONNECT + "/api/user/register", data)
    console.log(response)

    } catch (error) {
      console.log(error.response.data)
    }

  }
  
  );



  return (
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
  );
};
