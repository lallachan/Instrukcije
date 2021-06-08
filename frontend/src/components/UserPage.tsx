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
  FaHeart,
  FaImage,
  FaMapMarker,
  FaMapMarkerAlt,
  FaStar,
  FaThumbsDown,
  FaThumbsUp,
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

interface Props {}

const UserPage: React.FC = (props: Props) => {
  const arr = [1, 2, 3, 5];

  const [picture, setPicture] = useState(null);
  const [imgData, setImgData] = useState<any>(avatar);

  const { jwt, data, setData } = UseHeaderContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cloudinary =
  "https://res.cloudinary.com/dbfwwnhat/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/";
  useEffect(() => {
    if (_.isEqual({}, data)) {
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

      setData({ ...data, imageUrl: imgUrl });
    } catch (error) {
      console.log(error);
    }
  }
  function showWidget() {
    widget_nes.open();
  }

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

  function EditProfileModal() {
    const handleSubmit = async (values: any, { setSubmitting }: any) => {
      try {
        const res = await axios.put(
          process.env.REACT_APP_SERVER_CONNECT + "/api/user/updateUserData",
          _.omit(values, "select"),
          {
            headers: {
              "auth-token": jwt,
            },
          }
        );
        const new_data = await axios.get(
          process.env.REACT_APP_SERVER_CONNECT + "/api/user",
          {
            headers: { "auth-token": jwt },
          }
        );
        setData(new_data.data);
        setSubmitting(false);
       
        onClose();
      } catch (err) {
        console.log(err.response.data);
      }
    };

  

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Uredi profil</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                ..._.omit(data, [
                  "email",
                  "imageUrl",
                  "location",
                  "comments",
                  "ratedUsers",
                  "date",
                  "reviewedUsers",
                  "rating",
                  "tags",
                  "timesRated",
                  "_id"
                ]),
                select: "",
              }}
              onSubmit={handleSubmit}
            >
              {/* {({ handleSubmit, values, errors }) => ( */}
              <Form>
                <Stack spacing={4}>
                  <FormControl>
                    <InputControl name="firstName" />
                  </FormControl>
                  <FormControl>
                    <InputControl name="lastName" />
                  </FormControl>
                  <FormControl>
                    <TextareaControl name="desc" />
                  </FormControl>
                  <FormControl>
                    <InputControl name="phoneNumber" />
                  </FormControl>
                  <FormControl>
                    <InputControl name="address" />
                  </FormControl>
                  <FormControl>
                    <InputControl name="city" />
                  </FormControl>
                  <FormControl>
                    <InputControl name="zip" />
                  </FormControl>
                  <FormControl>
                    <InputControl name="price" />
                  </FormControl>
                  <ButtonGroup>
                    <SubmitButton>Submit</SubmitButton>
                    <ResetButton>Reset</ResetButton>
                  </ButtonGroup>
                </Stack>
              </Form>
              {/* )} */}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  if (_.isEqual({}, data)) return <Spinner />;

  function Komentari(komentari: any) {
    return (
      <div>
        {komentari.komentari.map((c: any) => {
          var d = new Date(c.created_at);

          var datestring =
            d.getDate() +
            "." +
            (d.getMonth() + 1) +
            "." +
            d.getFullYear() +
            " " +
            d.getHours() +
            ":" +
            d.getMinutes();

          return (
            <Box borderRadius="3px" border="2px solid grey" p="10">
              <HStack>
                <Image
                  mr="4"
                  mb="6"
                  borderRadius="full"
                  maxW="40px"
                  src={
                    _.isEmpty(c.user.imageUrl) ? avatar : cloudinary + c.user.imageUrl
                  }
                />

                <Box>
                  <Heading size="md" textAlign="left">
                    {c.user.firstName} {c.user.lastName}
                  </Heading>
                  <Text textAlign="left"> {c.comment}</Text>

                  <Text>Posted at {datestring}</Text>
                </Box>
              </HStack>
            </Box>
          );
        })}
      </div>
    );
  }

  return (
    <Stack
    h="max-content"
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
            src={imgData}
          />
          <Stack mt="10">
            <Button onClick={showWidget}>
              <Icon children={<FaImage />} />
              Upload photo
            </Button>
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
        <Stack mt="70px" p="10" spacing={6} border={_.isUndefined(data.price)? "" : "2px solid teal"}>
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
                {data.tags?.map((tag) => {
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

         
              <HStack w="100%">
                <Heading w="20%">8,6</Heading>

                {arr.map((star) => {
                  return (
                    <Icon w={10} h={10} color="teal" children={<FaStar />} />
                  );
                })}
                <Icon w={10} h={10} color="black" children={<FaStar />} />
              </HStack>

             
            </>
          )}
        </Stack>
        {_.isUndefined(data.comments) ? null : (
          <>
            <h1>Komentari</h1>
            <Komentari komentari={data.comments} />
            <Komentari komentari={data.comments} />
            <Komentari komentari={data.comments} />
            <Komentari komentari={data.comments} />
            <Komentari komentari={data.comments} />
          </>
        )}
       
      </VStack>

      <VStack w={["100%", "100%", "100%", "30%", "30%"]}>
        <Stack mt="6" w={["100%", "100%", "100%", "50%", "100%"]}>
          <Button onClick={onOpen}>Uredi profil</Button>
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

      <>
        <EditProfileModal />
      </>
    </Stack>
  );
};

export default UserPage;
