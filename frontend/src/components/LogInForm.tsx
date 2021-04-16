import {
    Input,
    InputGroup,
    InputLeftElement,
    Divider,
    Stack,
    FormControl,
    Icon,
    Button,
    FormHelperText,
  } from "@chakra-ui/react";
  
  import React from "react";
  import {FaEnvelope,FaInfoCircle,FaLock} from 'react-icons/fa'
  
  interface Props {}
  
  export const LogInForm: React.FC = (props: Props) => {
    return (
      <form action="submit">
        <Stack spacing={4} >
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<FaEnvelope />} />
              <Input bg="white" _hover={{border:"2px solid teal"}} type="email" placeholder="Email" aria-label="Email" w="100%"/>
            </InputGroup>
          </FormControl>
  
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<FaLock />} />
              <Input bg="white" _hover={{border:"2px solid teal"}} type="password" placeholder="Password" aria-label="Password" />
            </InputGroup>
          </FormControl>
  
          <Button type="submit" backgroundColor="teal" color="white" variant="solid" _hover={{boxShadow:'md'}} _active={{boxShadow:'lg'}} >
            Login!
          </Button>
         <br/>
        </Stack>
        
      </form>
    );
  };
  