
import Icon from "@chakra-ui/icon";
import {
  Box,
  Divider,
  Heading,
  HStack,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  VStack,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag,
  Grid,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  InputLeftAddon,
  Input,
  InputLeftElement,
  Textarea,
  ButtonGroup,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import {
  FaCommentAlt,
  FaDollarSign,
  FaImage,
  FaLessThan,
  FaMapMarker,
  FaMapMarkerAlt,
  FaRev,
  FaStar,
  FaUser,
} from "react-icons/fa";
import image from "../images/profileImage.jpg";
import avatar from "../images/avatar.png";
import axios from "axios";
import { UseHeaderContext } from "./Contexts/HeaderContext";
import _, { isEqual } from "lodash";

import marker from "../images/marker.png";
import ReactMapGL, { Marker } from "react-map-gl";
import { useForm } from "react-hook-form";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import {
  InputControl,
  ResetButton,
  SelectControl,
  SubmitButton,
  TextareaControl,
} from "formik-chakra-ui";
import { object } from "yup/lib/locale";
import { predmeti } from "../PREDMETI.json";
import { useParams } from "react-router";
import { IconContext } from "react-icons/lib";

interface Props {
    
}

export const PublicPage = (props: Props) => {

  function Map() {
    const innitial_lat = _.isUndefined(data.price)
      ? 0
      : data.location!.coordinates![1];
    const innitial_long = _.isUndefined(data.price)
      ? 0
      : data.location!.coordinates![0];
    const [viewport, setViewport] = useState({
      width: "100%",
      height: "500px",
      latitude: innitial_lat,
      longitude: innitial_long,
      zoom: 15,
    });
    if (_.isUndefined(data.price)) return <></>;
    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
      >
        <Marker
          latitude={data.location!.coordinates![1]}
          longitude={data.location!.coordinates![0]}
          offsetLeft={-20}
          offsetTop={-10}
        >
          <img width="40px" src={marker} />
        </Marker>
      </ReactMapGL>
    );
  }


    const [data,setData] = useState<any>(null)
    const arr = [1, 2, 3,4, 5];
    const [imgData, setImgData] = useState<any>(avatar);
    const { jwt, data : userData } = UseHeaderContext();

    let { id } = useParams<any>();

    useEffect(() => {
        console.log("hej")
        axios.get(process.env.REACT_APP_SERVER_CONNECT + "/api/user/"+id)
        .then(res=>{
            setData(res.data)
            console.log(res.data)
        })
        .catch(err=>{
          console.log(err.data)
        })
    }, [])


    function Rating(){
      const stars = [1,2,3,4,5]
      const [indx, setIndx] = useState(0)
      const [isRated, setIsRated] = useState(false)

      async function rateUser(rate:Number){
      setIsRated(true)
      if(_.isEmpty(jwt)) alert("Please log in or create an account!")   
      try{const res = await axios.put(process.env.REACT_APP_SERVER_CONNECT + "/api/user/"+ id + "/rate",{grade:rate},{headers:{"auth-token":jwt}})
        console.log(res.data)
    }
      catch(err){
          console.log(err.message)
      }
      
        

      }

      if(_.isUndefined(data.rating)){return <></>}
      return <HStack w="100%">
      <Heading w="20%">{data.rating.toFixed(2)}</Heading>


 

      {arr.map((star,i) => {
        
      let result:any = Number.parseFloat((data.rating - i).toFixed(2))
      if(result<0){
        result = 0;
      }
     
      if(result >1){result =1}
      result = result.toFixed(2)
      console.log(result,typeof(result))
        return (
        <Icon h={10} w={10}>
          <svg  >

         <defs>
           <linearGradient id="myGradient" gradientTransform="rotate(0)">
             <stop offset={result+""+"%"}  stopColor="black" />
             
             <stop offset="0" stopColor="white" />
           </linearGradient>
         </defs>
         <IconContext.Provider value={{ attr: {fill: "url('#myGradient')"}}}>
           <FaStar />
         </IconContext.Provider>
       </svg>
       </Icon>
        );
      })}
    
      {data.rating? <Button>Already Rated</Button> :  
       
      <Popover  placement="left" >
      
      <PopoverTrigger >
      <Button>Trigger</Button>
       
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Ocijenite instruktora!</PopoverHeader>
        <PopoverBody onMouseLeave={() => setIndx(0)}> {stars.map((star,i) => {
        return (
          <Icon 
          onMouseOver={() => {
       
          setIndx(i)
          }}
          onClick={()=>{
         
          rateUser(i+1)
          return <div>Thanks for Rating!</div>
          }}
          
          w={10} h={10} color={indx>=i? "rgb(255, 204, 0)" : "grey"}  children={<FaStar />} />
        );
      })}</PopoverBody>
      </PopoverContent>
    </Popover>
    }
    </HStack>
    }


 
    if(_.isNull(data)) {return <Spinner/>} 
    return (
      <Stack
        h="300vh"
        w={["100%", "100%", "100%", "100%", "80%"]}
        direction={["column", "column", "column", "row", "row"]}
        mx="auto"
      >
        {/* <Heading mt="20">Dobrodošli!</Heading> */}
  
        <VStack
          w={["100%", "100%", "100%", "30%", "30%"]}
          mt="20"
          h="80vh"
          mx="auto"
        >
          <Box boxSize="sm">
            <Image
              borderRadius="full"
              border="1px solid teal"
              boxSize="300px"
              ml="10"
              mt="5"
              src={"https://res.cloudinary.com/dbfwwnhat/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/"+ data.imageUrl}
            />
            <Stack mt="10">
            </Stack>
            <Divider mt="10" />
            {_.isUndefined(data.price) ? null : (
              <Stack mt="10" border="2px solid teal" p="4">
                <Heading textAlign="left">Kratki Opis</Heading>
                <Text textAlign="left">{data.desc}</Text>
              </Stack>
            )}
          </Box>
        </VStack>
  
        <VStack w={["100%", "100%", "100%", "50%", "50%"]}>
          <Stack mt="70px" p="6" spacing={6} border="2px solid teal">
            <HStack w="100%">
              <Heading as="h2" size="2xl">
                {data.firstName} {data.lastName}
              </Heading>
            </HStack>
            {_.isUndefined(data.price) ? null : (
              <>
                <HStack>
                  <Icon w={8} h={8} children={<FaMapMarkerAlt />}></Icon>
                  <Heading size="md">
                    {data.address},{data.zip} {data.city}
                  </Heading>
                </HStack>
  
                <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                  {data.tags?.map((tag:any) => {
                    return (
                      <Tag
                        w="100%"
                        size="lg"
                        p="6"
                        textAlign="center"
                        justifyContent="center"
                      >
                        {tag}
                      </Tag>
                    );
                  })}
                </Grid>
  
                {/* TODO RANG */}
                <Rating/>
                
  
                <Button w="50%" p="4" size="lg">
                  <Icon w={6} h={6} color="black" children={<FaCommentAlt />} />
                  Pošalji poruku
                </Button>
              </>
            )}
          </Stack>
        </VStack>
  
        <VStack w={["100%", "100%", "100%", "30%", "30%"]}>
          <Stack mt="4" w={["100%", "100%", "100%", "50%", "100%"]}>
            <Heading fontSize="50px" mt="20">
              {_.isUndefined(data.price) ? null : data.price + "kn/h"}
            </Heading>
            <Stack textAlign="left" border="2px solid teal" p="4">
              <Heading size="md">Kontakt</Heading>
              <Text>
                {_.isUndefined(data.phoneNumber) ? null : data.phoneNumber}
              </Text>
              <Text>{data.email}</Text>
            </Stack>
          </Stack>
  
          <Divider />
          <Map />
        </VStack>
  
       
      </Stack>
    );
}
