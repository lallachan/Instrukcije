import { createContext, useContext } from "react"

type modalValues = {
   
    isOpen : boolean,
    onClose : ()=>void,
    onOpen : ()=>void,
  }

export const ModalContext = createContext<modalValues>({
    isOpen:false,
    onClose:()=>{},
    onOpen:()=>{}
  });
  
  export const UseModalContext = ()=> useContext(ModalContext)
  