import { createContext, useContext } from "react"

type userData = {
   
    jwt : string,
    data : {},
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
  