
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
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
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

interface Props {
    
}

export const PublicPage = (props: Props) => {

    const [data,setData] = useState<any>(null)

    let { id } = useParams<any>();

    useEffect(() => {
        console.log("hey")
        axios.get(process.env.REACT_APP_SERVER_CONNECT + "/api/user/"+id)
        .then(res=>{
            setData(res.data)
        })
    }, [])

    return (
        <div >
            HELLO
            {JSON.stringify(data)}
        </div>
    )
}
