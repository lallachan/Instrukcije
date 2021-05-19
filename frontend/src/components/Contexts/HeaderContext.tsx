
import { createContext, useContext } from "react"


type Data = {
  firstName?: string,
  lastName?: string,
  email?: RegExp,
  password?: string,
  desc?: string,
  phoneNumber?: RegExp,
  address?: string,
  city?:string,
  zip?: RegExp,
  tags? : [],
  price? : number,
  imageUrl? : string,
  comments? : [],
  location?: {
    type?: string,
    coordinates? : number[]
  }
}

type userData = {
   
    jwt : string,
    data :Data,
    setData : Function,
    setJwt : Function
  }

export const HeaderContext = createContext<userData>({
    jwt : "",
    data : {},
    setData : Function ,
    setJwt : Function 
    
  });
  
  export const UseHeaderContext = ()=> useContext(HeaderContext)
  