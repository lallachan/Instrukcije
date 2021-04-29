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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  FaCommentAlt,
  FaDollarSign,
  FaImage,
  FaMapMarker,
  FaMapMarkerAlt,
  FaStar,
  FaUser,
} from "react-icons/fa";
import image from "../images/profileImage.jpg";
import avatar from "../images/avatar.png";
import axios from "axios";
import { UseHeaderContext } from "./Contexts/HeaderContext";
import _ from "lodash";

import ReactMapGL, { Marker } from 'react-map-gl';


interface Props {

}





const UserPage: React.FC = (props: Props) => {



  const arr = [1, 2, 3, 5];

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState<any>(avatar);

  const { jwt, data, setData } = UseHeaderContext();
  


  useEffect(() => {
    if (_.isEqual({},data)) {
      axios
        .get(process.env.REACT_APP_SERVER_CONNECT + "/api/user", {
          headers: { "auth-token": jwt },
        })
        .then((res) => {
          setData(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    const help: any = data;

    if (!_.isEmpty(help.imageUrl)) {
      setImgData(
        "https://res.cloudinary.com/dbfwwnhat/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/" +
          help.imageUrl
      );
    } else {
      setImgData(avatar);
    }

    
  }, [data]);

  const nes: any = window;
  let widget_nes = nes.cloudinary.createUploadWidget(
    {
      cloudName: "dbfwwnhat",
      uploadPreset: "jydos0sa",
      folder: "users",
      //  cropping:true,
      name: "hey",
    },
    (error: any, result: any) => {
      if (result.event === "success") {
        updateImage(result.info.path);
      }
    }
  );

  async function updateImage(imgUrl: string) {
    setImgData(
      "https://res.cloudinary.com/dbfwwnhat/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/" +
        imgUrl
    );
    try {
      const res = await axios.put(
        process.env.REACT_APP_SERVER_CONNECT + "/api/user/updateImage",
        { imageUrl: imgUrl },
        {
          headers: {
            "auth-token": jwt,
          },
        }
      );

      setData({...data,imageUrl:imgUrl})

    } catch (error) {
      console.log(error);
    }
  }
  function showWidget() {
    widget_nes.open();
  }




  function Map() {
    const innitial_lat = _.isUndefined(data.price)?0:data.location!.coordinates![1]
    const innitial_long = _.isUndefined(data.price)?0:data.location!.coordinates![0]
    const [viewport, setViewport] = useState({
      width: "100%",
      height: "500px",
      latitude: innitial_lat,
      longitude: innitial_long,
      zoom: 15
    });
    if(_.isUndefined(data.price))return<></>
    return (
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport:any) => setViewport(nextViewport)}
      >
        <Marker latitude={data.location!.coordinates![1]} longitude={data.location!.coordinates![0]} offsetLeft={-20} offsetTop={-10}>
          <img width="40px" src="https://www.cp-desk.com/wp-content/uploads/2019/02/map-marker-free-download-png.png" />
        </Marker>
      </ReactMapGL>
    );
  }
  



  if(_.isEqual({},data)) return <Spinner/>
  
  return (
    <Stack h="300vh" w={["100%","100%","100%","100%","80%"]} direction={["column","column","column","row","row"]} mx="auto" >
      {/* <Heading mt="20">Dobrodošli!</Heading> */}

      <VStack w={["100%","100%","100%","30%","30%"]} mt="20" h="80vh" mx="auto">
       
     
        <Box boxSize="sm" >
          <Image borderRadius="full" border="1px solid teal" boxSize="300px" ml="10" mt="5" src={imgData} />
          <Stack mt="10">
          <Button onClick={showWidget}>
            <Icon children={<FaImage />} />
            Upload photo
          </Button>
          </Stack>
          <Divider mt="10" />
            {_.isUndefined(data.price)?null: <Stack mt="10" border="2px solid teal" p="4">
            <Heading textAlign="left">Kratki Opis</Heading>
            <Text textAlign="left">
              {data.desc}
            </Text>
          </Stack>}
         

          

        

         
        </Box>
     
      </VStack>

      <VStack w={["100%","100%","100%","50%","50%"]} >
        <Stack  mt="70px" p="10" spacing={6} >
          <HStack w="100%">
            <Heading as="h2" size="2xl">
           
            {data.firstName} {data.lastName}
            
            </Heading>

            

              
          </HStack>
{_.isUndefined(data.price)?null:<>
          <HStack>
              <Icon w={8} h={8} children={<FaMapMarkerAlt />}></Icon>
              <Heading size="md">{data.address},{data.zip} {data.city}</Heading>
          </HStack>

          <Grid templateColumns="repeat(4, 1fr)" gap={6} >
           
           {data.tags?.map(tag=>{
             return  <Tag w="100%" size="lg" p="6" textAlign="center" justifyContent="center">{tag}</Tag>
           })}
   
          </Grid>

          {/* TODO RANG */}
          <HStack w="100%">
          <Heading w="20%">8,6</Heading>

            {arr.map((star) => {
              return <Icon w={10} h={10} color="teal" children={<FaStar />} />;
            })}
            <Icon w={10} h={10} color="black" children={<FaStar />} />
          </HStack>

          
            <Button w="50%" p="4" size="lg">
              <Icon w={6} h={6} color="black" children={<FaCommentAlt />} />
              Pošalji poruku
              </Button>
              </>}
        </Stack>

       
      

      </VStack>
    

      <VStack w={["100%","100%","100%","30%","30%"]} >
          <Stack mt="6" w={["100%","100%","100%","50%","100%"]}>
                <Heading fontSize="50px" mt="20">{_.isUndefined(data.price)? null : data.price + "kn/h"}</Heading>
                <Stack textAlign="left"  border="2px solid teal" p="4" >
                <Heading size="md" >Kontakt</Heading>
                <Text>{_.isUndefined( data.phoneNumber)?null:data.phoneNumber}</Text>
                <Text>{data.email}</Text>
            </Stack>
            </Stack>
    
   
              <Divider  />
              <Map />
              
      </VStack>
    
    </Stack>


  );



  
  
   
};

export default UserPage;
