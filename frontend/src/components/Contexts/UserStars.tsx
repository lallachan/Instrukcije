import Icon from '@chakra-ui/icon'
import { Heading, HStack, Text, VStack } from '@chakra-ui/layout'
import _ from 'lodash'
import React from 'react'
import { FaStar } from 'react-icons/fa'


interface Props {
    rating:number
}

const UserStars = (props: Props) => {
        const {rating} = props
    
        
        const arr =[1,2,3,4,5]
        if(_.isUndefined(rating)){return <></>}
        return <VStack w="100%">
        <Heading >{rating==0?"Nije ocijenjen":rating.toFixed(2)}</Heading>
  

        <HStack>
        {arr.map((star,i) => {
          
        let result:any = Number.parseFloat((rating - i).toFixed(2))
        if(result<0){
          result = 0;
        }
        result-=1
        result*=100
       
  
       return <div> 
        
         <Icon  style={{position:"absolute",marginRight:"70px"}} w={10} h={10} color="rgb(255, 204, 0)" children={  <FaStar style={{clipPath:`inset(0 ${1-result}% 0 0)`}}/>}/>
         <Icon w={10} h={10} children={<FaStar  style={{ stroke: "grey" ,strokeWidth: "30"}}/>}/>
        </div>
           
     
        })}
        </HStack>
        </VStack>

}

export default UserStars


