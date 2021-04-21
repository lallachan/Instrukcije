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
import axios from "axios";
  
  import React from "react";
import { useForm } from "react-hook-form";
  import {FaEnvelope,FaInfoCircle,FaLock} from 'react-icons/fa'
  

  type LoginUser = {
    email: string,
    password: string
  }

  interface Props {}
  
  export const LogInForm: React.FC = (props: Props) => {

    const { register, handleSubmit } = useForm<LoginUser>();

    const onSubmit = handleSubmit( async(data) => {

      try {
      
      console.log(process.env.REACT_APP_SERVER_CONNECT + "" + process.env.REACT_APP_LOGIN_ROUTE)
      const response = await axios.post(process.env.REACT_APP_SERVER_CONNECT + "" + process.env.REACT_APP_LOGIN_ROUTE, data)
      console.log(response)
      localStorage.setItem('token',response.data)

      // // TODO REMOVE THIS
      // const userResponse = await axios.get(process.env.REACT_APP_SERVER_CONNECT + "/api/user", {
      //   headers: {
      //     "auth-token" : localStorage.getItem('token')
      //   }
      // })
  
      // console.log(userResponse.data)


      } catch (error) {
        console.log(error.response.data)
      }
  
    }
    
    );

    return (
      <form onSubmit ={onSubmit}>
        <Stack spacing={4} >
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<FaEnvelope />} />
              <Input {...register("email")} bg="white" _hover={{border:"2px solid teal"}} type="email" placeholder="Email" aria-label="Email" w="100%"/>
            </InputGroup>
          </FormControl>
  
          <FormControl isRequired>
            <InputGroup>
              <InputLeftElement children={<FaLock />} />
              <Input {...register("password")}  bg="white" _hover={{border:"2px solid teal"}} type="password" placeholder="Password" aria-label="Password" />
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
  