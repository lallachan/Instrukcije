import { Button } from "@chakra-ui/button";
import { FormLabel } from "@chakra-ui/form-control";
import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Divider, VStack } from "@chakra-ui/layout";
import React from "react";
import axios from "axios"

interface Props {}

const SignUp: React.FC = (props: Props) => {

    const [serverResponse, setServerResponse] = React.useState("")
    const [loginResponse, setLoginResponse] = React.useState("")

   
    const {REACT_APP_SERVER_CONNECT} = process.env
    console.log(process.env)
    console.log(process.env.REACT_APP_SERVER_CONNECT)


  const handleSubmit: Function = (e: any) => {
      e.preventDefault()

        const userObj = {
            name: e.target[0].value,
            password : e.target[1].value,
            email: e.target[2].value
        }

        axios.post(REACT_APP_SERVER_CONNECT+"/api/user/register",{
          header:{
            "Access-Control-Allow-Origin" :'*' ,
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
            "Access-Control-Allow-Credentials": true,
            'Access-Control-Allow-Headers':'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
          },
          data:userObj,
          crossdomain:true
        })
        .then(res=>{
           setServerResponse(res.data.user)
        })
        .catch((err)=>{
            console.log(err.response.data)
           setServerResponse(err.response.data)
        })
        
  };

  const handleLogIn:Function = (e:any)=>{
      e.preventDefault()
      const userObj = {
        email: e.target[0].value,
        password : e.target[1].value,
    }

    axios.post(REACT_APP_SERVER_CONNECT +"/api/user/login",userObj)
    .then(res=>{
        console.log(res)
        setLoginResponse(res.data)  
        localStorage.setItem('token', res.data);
    })
    .catch((err)=>{
        console.log(err.response.data)
        setLoginResponse(err.response.data)
    })
  }


  const handleUser: Function = ()=>{
    axios.get(REACT_APP_SERVER_CONNECT+"/api/user/",{
        data:{},
        headers:{
            "auth-token": localStorage.getItem('token')
        },
    })
    .then(res=>{
        console.log(res.data)
    })
    .catch((err)=>{
        console.log(err.response.data)
    })
  }

  return (
    
    <VStack>
          <h1>Register</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormControl id="Name" name="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input placeholder="Name" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="password" />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="email" />
        </FormControl>
        <Button colorScheme="teal" size="md" type="submit">
          Button
        </Button>
      </form>
        <p>Server Response: {serverResponse} </p>
       
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <h1>Log in</h1>
        <form onSubmit={(e) => handleLogIn(e)}>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input placeholder="email" />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input placeholder="password" />
        </FormControl>
        <Button colorScheme="teal" size="md" type="submit">
          Button
        </Button>
      </form>
      <p>Server Response: {loginResponse} </p>
      
      <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Divider/>
        <Button onClick ={()=>handleUser()}>Users</Button>
        <Button onClick ={()=>localStorage.removeItem('token')}>Log Out</Button>
    </VStack>
  );
};

export default SignUp;
