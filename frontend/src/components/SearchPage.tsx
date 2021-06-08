import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Image } from "@chakra-ui/image";
import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
} from "@chakra-ui/input";
import {
  Badge,
  Box,
  Container,
  Grid,
  Heading,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Tag } from "@chakra-ui/tag";
import axios from "axios";
import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { FaCity, FaSearch, FaStar } from "react-icons/fa";
import { useHistory } from "react-router";
import avatar from "../images/avatar.png";
import UserStars from "./Contexts/UserStars";
import gradovi from "../gradovi.json";
import { Select } from "@chakra-ui/select";
interface Props {}

export const SearchPage = (props: Props) => {
  const history: any = useHistory();

  const [tutors, setTutors] = useState(history.location.state.detail);
  const [subject, setSubject] = useState(history.location.state.subject);
  const [nextPage, setNextPage] = useState(history.location.state.nextPage);
  const [hasNextPage, setHasNextPage] = useState(
    history.location.state.hasNextPage
  );
  const [loading, setLoading] = useState(false);
  const selectRef: any = useRef(null);

  function truncateTest(text: string) {
    if (text.length > 80) {
      return text.substring(0, 50) + "...";
    }
    return text;
  }

  async function handleLoadMore() {
    setLoading(true);
    try {
      let obj: any = {};
      if (!_.isEmpty(subject)) {
        obj.param = subject;
      }
      if (hasNextPage) {
        obj.page = nextPage;
      }
      if (!_.isEmpty(selectRef.current.value)) {
        obj.city = selectRef.current.value;
      }

      const res = await axios.post(
        process.env.REACT_APP_SERVER_CONNECT + "/api/search/",
        obj
      );

      setTutors([...tutors, ...res.data.docs]);
      setHasNextPage(res.data.hasNextPage);

      if (res.data.hasNextPage) {
        setNextPage(res.data.nextPage);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  async function handleSearch() {
    setLoading(true);
    try {
      let obj: any = {
        page: 1,
      };

      if (!_.isEmpty(subject)) {
        obj.param = subject;
      }
      if (!_.isEmpty(selectRef.current.value)) {
        obj.city = selectRef.current.value;
      }

      const res = await axios.post(
        process.env.REACT_APP_SERVER_CONNECT + "/api/search/",
        obj
      );

      setTutors([...res.data.docs]);
      setHasNextPage(res.data.hasNextPage);

      if (res.data.hasNextPage) {
        setNextPage(res.data.nextPage);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  function Tutor(props: any) {
    const { tutor } = props;
    const cloudinary =
      "https://res.cloudinary.com/dbfwwnhat/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,b_rgb:262c35/" +
      tutor.imageUrl;

    function gotoTutorPage() {
      history.push(`/users/${tutor._id}`);
    }
    return (
      <>
        <Box
          borderRadius="xs"
          key={tutor.id}
          border="1px solid teal"
          p="2"
          backgroundColor="white"
          _hover={{ backgroundColor: "teal.500", color: "white" }}
          onClick={gotoTutorPage}
        >
          <VStack>
            <Tag
              colorScheme="green"
              borderRadius="full"
              backgroundColor="teal.100"
              p="2"
              justifySelf="right"
              fontSize="xl"
              mb="2"
            >
              {tutor.price}kn/h
            </Tag>

            <Image
              mt="8"
              borderRadius="full"
              boxSize="150px"
              src={_.isEmpty(tutor.imageUrl) ? avatar : cloudinary}
            />

            <Heading>
              {tutor.firstName} {tutor.lastName}
            </Heading>
            <Stack>
              <UserStars rating={tutor.rating} />
            </Stack>

            
            <Text justifyContent="center" w="3xs" h="100px">
              {truncateTest(tutor.desc)}
            </Text>

            <Button colorScheme="teal" variant="solid" mt="10">
              Više
            </Button>
          </VStack>
        </Box>
      </>
    );
  }

  return (
    <React.Fragment>
      <Stack
        m="0 auto"
        position="fixed"
        textAlign="center"
        justifyContent="center"
        w="100vw"
        h="100px"
        mt={["0", "0", "0", "0", "0"]}
        backgroundColor={[
          "teal.400",
          "teal.400",
          "teal.400",
          "teal.400",
          "teal.400",
        ]}
        zIndex="99"
      >
        <InputGroup mt="4" pl="2" w={["90%", "90%", "75%", "50%"]} mx="auto">
          <Input
            placeholder={subject}
            background="white"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <Select
            placeholder="Unesi grad"
            borderRadius="none"
            background="white"
            ref={selectRef}
          >
            {gradovi.map((i) => (
              <option value={i}>{i}</option>
            ))}
          </Select>
          <InputRightAddon
            onClick={() => {
              handleSearch();
            }}
            children={<FaSearch />}
          />
        </InputGroup>
      </Stack>

      <Stack
        w="100vw"
        backgroundColor="#E2E8F0"
        mt={["100px", "100px", "100px", "100px", "100px"]}
      >
        {loading ? (
          <Spinner mx="auto" mt="10" />
        ) : (
          <Grid
            p="2"
            mx="auto"
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
            gap={4}
            w={["100%", "100%", "80%", "80%"]}
          >
            {tutors.length === 0
              ? null
              : tutors.map((tutor: any) => {
                  return <Tutor tutor={tutor} />;
                })}
          </Grid>
        )}

        {hasNextPage ? (
          <Stack w="100vw">
            <Button
              mb="2"
              backgroundColor="teal.300"
              _hover={{ backgroundColor: "lightgrey" }}
              mx="auto"
              alignContent="center"
              onClick={handleLoadMore}
              w="20%"
            >
              Load More
            </Button>
          </Stack>
        ) : (
          
          <Heading>{_.isEqual([],tutors)?"Nema podataka za traženi pojam":"Kraj"}</Heading>
        )}
      </Stack>
    </React.Fragment>
  );
};
