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

interface Props {

}


const UserPage: React.FC = (props: Props) => {
  const arr = [1, 2, 3, 5];

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState<any>(avatar);

  const { jwt, data, setData } = UseHeaderContext();
  


  useEffect(() => {
    if (_.isEmpty(data)) {
      axios
        .get(process.env.REACT_APP_SERVER_CONNECT + "/api/user", {
          headers: { "auth-token": jwt },
        })
        .then((res) => {
          setData(res.data);
          

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
    } catch (error) {
      console.log(error);
    }
  }
  function showWidget() {
    widget_nes.open();
  }


  if(data==null) return <Spinner/>
  
  return (
    <Stack h="300vh" w="80vw" direction="row" mx="auto">
      {/* <Heading mt="20">Dobrodošli!</Heading> */}

      <VStack w="30%" mt="20">
        <Box boxSize="sm">
          <Image borderRadius="full" boxSize="300px" src={imgData} />
          <Button onClick={showWidget}>
            <Icon children={<FaImage />} />
            Upload photo
          </Button>
          <Divider mt="10" />

          <Stack mt="10">
            <Heading textAlign="left">Kratki Opis</Heading>
            <Text textAlign="left">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A harum
              laboriosam magnam officia? Repellendus totam impedit maiores hic
              cumque delectus ea, reprehenderit amet officia? Minus ut facere
              earum laudantium accusantium!
            </Text>
          </Stack>

          <Stack mt="10">
            <Heading textAlign="left">Posao</Heading>
            <Text textAlign="left">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A harum
              laboriosam magnam officia? Repellendus totam impedit maiores hic
              cumque delectus ea, reprehenderit amet officia? Minus ut facere
              earum laudantium accusantium!
            </Text>
          </Stack>

          <Divider mt="10" />

          <UnorderedList mt="10">
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </UnorderedList>
        </Box>
      </VStack>

      <VStack w="70%" textAlign="left" justifyContent="left">
        <Stack w="100%" mt="70px" p="10" spacing={6}>
          <HStack>
            <Heading as="h2" size="2xl">
           
            {data.firstName}
            {data.address}
            {data.zip}
            {data.email}
            {data.phoneNumber}
            {data.price}
            {data.tags}
            {data.desc}
            </Heading>

            <Stack w="50%" direction="row">
              <Icon w={8} h={8} children={<FaMapMarkerAlt />}></Icon>
              <Text></Text>

              <Stat>
                <StatLabel>Collected Fees</StatLabel>
                <StatNumber>£0.00</StatNumber>
                <StatHelpText>Feb 12 - Feb 28</StatHelpText>
              </Stat>
            </Stack>
          </HStack>

          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Tag w="100%" h="10" size="lg">
              Matematika
            </Tag>
            <Tag w="100%" h="10" size="lg">
              Fizika
            </Tag>
            <Tag w="100%" h="10" size="lg">
              Hrvatski
            </Tag>
            <Tag w="100%" h="10" size="lg">
              Hrvatski
            </Tag>
            <Tag w="100%" h="10" size="lg">
              Hrvatski
            </Tag>
          </Grid>

          <Text>Rang</Text>
          <HStack w="100%">
            <Heading w="20%">8,6</Heading>

            {arr.map((star) => {
              return <Icon w={10} h={10} color="teal" children={<FaStar />} />;
            })}
            <Icon w={10} h={10} color="black" children={<FaStar />} />
          </HStack>

          <HStack w="100%" mt="20" spacing={4}>
            <Button w="50%" p="4" size="lg">
              <Icon w={6} h={6} color="black" children={<FaCommentAlt />} />
              Send Message
            </Button>
          </HStack>
        </Stack>

        <Divider />

        <VStack textAlign="left" alignContent="left">
          <Stack
            spacing={4}
            w="100%"
            textAlign="left"
            justifyContent="left"
            alignContent="left"
          >
            <Text>Phone : +385 9378543324</Text>
            <Text>Address : 2826 Del Dew Drive </Text>
            <Text>Email : z4599ug0ay@temporary-mail.net</Text>
            <Text>www.google.com</Text>

            <Text>
              <FaDollarSign />
              100kn/h
            </Text>
          </Stack>
        </VStack>
      </VStack>
    </Stack>
  );



  
  
   
};

export default UserPage;
