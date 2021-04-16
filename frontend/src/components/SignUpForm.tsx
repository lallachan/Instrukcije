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

import React from "react";
import {FaEnvelope,FaInfoCircle,FaLock} from 'react-icons/fa'

interface Props {}

export const SignUpForm: React.FC = (props: Props) => {
  return (
    <form action="submit">
      <Stack spacing={4} >
        <FormControl isRequired >
        <InputGroup >
            <InputLeftElement children={<FaInfoCircle />} />
            <Input bg="white" _hover={{border:"2px solid teal"}} type="name" placeholder="First name" aria-label="First name" />
          </InputGroup>
        </FormControl>
        <FormControl isRequired>
        <InputGroup>
            <InputLeftElement children={<FaInfoCircle />} />
            <Input bg="white" _hover={{border:"2px solid teal"}} type="name" placeholder="Last name" aria-label="Last name" />
          </InputGroup>
        </FormControl>
        <Divider borderColor='gray.300'/>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<FaEnvelope />} />
            <Input  bg="white" _hover={{border:"2px solid teal"}} type="email" placeholder="Email" aria-label="Email" />
          </InputGroup>
        </FormControl>

        <FormControl isRequired>
          <InputGroup>
            <InputLeftElement children={<FaLock />} />
            <Input bg="white" _hover={{border:"2px solid teal"}} type="password" placeholder="Password" aria-label="Password" />
          </InputGroup>
        </FormControl>

        <Button type="submit"  backgroundColor="teal" color="white" variant="solid" _hover={{boxShadow:'md'}} _active={{boxShadow:'lg'}} >
          Sign up!
        </Button>
        <br/>
      </Stack>
    </form>
  );
};
