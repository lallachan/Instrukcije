import charka, {
  background,
  Box,
  Button,
  Checkbox,
  Flex,
  flexbox,
  FormControl,
  Grid,
  Heading,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  StyledStepper,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tag,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { Image } from "cloudinary-react";

import { predmeti } from "../PREDMETI.json";

import {
  FaAddressBook,
  FaClosedCaptioning,
  FaDollarSign,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaImage,
  FaInfoCircle,
  FaLock,
  FaPersonBooth,
  FaPhone,
} from "react-icons/fa";
import { useForm, Resolver } from "react-hook-form";
import { getValueTransition } from "framer-motion/types/animation/utils/transitions";
import logo from "../images/logoEmail.png";
import axios from "axios";

type TutorStep1 = {
  firstName: string;
  lastName: string;
  email: RegExp;
  password: string;
};

type TutorStep2 = {
  desc: string;
  phoneNumber: RegExp;
  address: string;
  zip: RegExp;
};

interface Props {}

const TutorForm: React.FC = (props: Props) => {
  const [tags, setTags] = useState<any>([]);

  const [endNOTag, setEndNoTag] = useState<Boolean>(false);
  const ref1 = useRef<any>(null);

  const ref2 = useRef<any>(null);

  const ref3 = useRef<any>(null);

  const selectRef = useRef<any>(null);

  // const [toggleActive,setToggleActive] = useState(true)
  const [toggleTab2, setToggleTab2] = useState(true);
  const [toggleTab3, setToggleTab3] = useState(true);

  const [price, setPrice] = useState(0);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [error, setError] = useState("")

  const [toggleEmailVal, seTtoggleEmailVal] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TutorStep1>({ mode: "all" });
  const {
    watch: watch2,
    register: register2,
    handleSubmit : handleSubmit2,
    formState: { errors: errors2, isValid: isValid2 },
  } = useForm<TutorStep2>({ mode: "all" });

  useEffect(() => {
    ref2.current.click();
  }, [toggleTab2]);

  useEffect(() => {
    ref3.current.click();
  }, [toggleTab3]);

  function dodajTag(value: any) {
    setTags([...tags, value]);
  }


    const onSubmit =  (e:any)=>{
      console.log(e)
      e.preventDefault()
      const post = {...watch(),...watch2(),tags,price}
      
      axios.post("http://localhost:5000/api/userAuth/registerInstruktor",post)

      .then(res=> {
        setError("")
        seTtoggleEmailVal(true);
      }
       
        )
      .catch(err=>{
        console.log(err.response.data)
        setError(err.response.data + "")
        ref1.current.click()
        
      }
       
        )
    }

    

  
  
  

  const EmailValidation: React.FC = (props: Props) => {
    return (
      <VStack
        h="md"
        w={["80vw", "80vw", "100vw", "50vw", "50vw"]}
        mx="auto"
        mt="4"
        p="2"
        mb="10"
        
      >
        <Heading >Email validacija</Heading>
        <Text>
          Poruka je poslana na vašu e-mail adresu.Molim vas kliknite na link i
          validirajte email. Ukoliko poruka nije došla, pričekajte par minuta.
          Ukoliko ne vidite poruku pogledajte vaše poruke (neželjena pošta).
        </Text>
        <Image src={logo} />
      </VStack>
    );
  };

  return (
    <div>
      <form onSubmit={(e)=>onSubmit(e)}>
      <VStack w="100vw">
        <Box backgroundColor="teal" w="100vw" mb="50">
          <Heading
            fontSize="50px"
            mt="20"
            color="white"
            backgroundColor="teal"
            h="30vh"
          >
            Postanite instruktor u 3 koraka
          </Heading>
        </Box>
        <Tabs isFitted colorScheme="teal" mt="20" w="100vw" mx="auto">
          <TabList
            defaultIndex={0}
            mx="auto"
            justifyContent="center"
            w={["80vw", "40vw", "40vw", "40vw"]}
          >
            <Tab fontSize="2xl" ref={ref1}>
              1
            </Tab>
            <Tab fontSize="2xl" ref={ref2} isDisabled={toggleTab2}>
              2
            </Tab>
            <Tab fontSize="2xl" ref={ref3} isDisabled={toggleTab3}>
              3
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {error}
              <Heading>Registracija</Heading>
              


              
              <Stack
                spacing={4}
                border="2px solid teal"
                borderRadius="10"
                p="10"
                mt="10"
                isRounded="true"
                mx="auto"
                w={["80vw", "50vw", "50vw", "50vw", "30vw"]}
              >
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement children={<FaInfoCircle />} />
                    <Input
                      _hover={{ border: "2px solid teal" }}
                      type="name"
                      placeholder="First name"
                      aria-label="First name"
                      variant="filled"
                      {...register("firstName", {
                        required: true,
                        maxLength: "30",
                      })}
                    />
                  </InputGroup>
                </FormControl>

                {errors.firstName && <p>Unesite vaše ime</p>}

                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement children={<FaInfoCircle />} />
                    <Input
                      _hover={{ border: "2px solid teal" }}
                      type="name"
                      placeholder="Last name"
                      aria-label="Last name"
                      variant="filled"
                      {...register("lastName", {
                        required: true,
                        maxLength: "30",
                      })}
                    />
                  </InputGroup>
                </FormControl>

                {errors.firstName && <p>Unesite vaše prezime</p>}

                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement children={<FaEnvelope />} />
                    <Input
                      _hover={{ border: "2px solid teal" }}
                      type="email"
                      placeholder="Email"
                      aria-label="Email"
                      variant="filled"
                      {...register("email", {
                        required: true,
                        pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      })}
                    />
                  </InputGroup>
                </FormControl>

                {errors.firstName && <p>Unesite vašu E-mail adresu</p>}

                <FormControl isRequired>
                  <InputGroup size="md">
                    <InputLeftElement children={<FaLock />} />
                    <Input
                      pr="4.5rem"
                      type={show ? "text" : "password"}
                      placeholder="Enter password"
                      variant="filled"
                      _hover={{ border: "2px solid teal" }}
                      {...register("password", {
                        required: true,
                        minLength: "6",
                      })}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? <FaEye /> : <FaEyeSlash />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {errors.firstName && <p>Šifra mora imati barem 6 znakova.</p>}
              </Stack>

              <Button
                mt="10"
                w="2xs"
                type="button"
                mb="20"
                disabled={!isValid}
                onClick={() => {
                  setToggleTab2(false);
                  ref2.current.click();
                }}
              >
                Next
              </Button>
            
            </TabPanel>
            <TabPanel>
              <Heading>Osnovni podaci</Heading>
             
              <Stack
                spacing={4}
                border="2px solid teal"
                borderRadius="10"
                p="10"
                mt="10"
                isRounded="true"
                mx="auto"
                w={["80vw", "50vw", "50vw", "50vw", "30vw"]}
              >
                <FormControl isRequired>
                  <Textarea
                    placeholder="A simple description about you..."
                    variant="filled"
                    _hover={{ border: "2px solid teal" }}
                    {...register2("desc", {
                      required: true,
                      maxLength: "1000",
                    })}
                  />
                </FormControl>

                {errors2.desc && <p>Unesite kratki opis o sebi.</p>}

                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaPhone color="gray.300" />}
                    />
                    <Input
                      type="tel"
                      placeholder="Phone number"
                      variant="filled"
                      _hover={{ border: "2px solid teal" }}
                      {...register2("phoneNumber", {
                        required: true,
                        pattern: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
                      })}
                    />
                  </InputGroup>
                </FormControl>

                {errors2.desc && <p>Unesite vaš broj mobitela.</p>}

                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaAddressBook color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Address"
                      variant="filled"
                      _hover={{ border: "2px solid teal" }}
                      {...register2("address", {
                        required: true,
                        maxLength: "50",
                      })}
                    />
                  </InputGroup>
                </FormControl>

                {errors2.desc && <p>Unesite vašu adresu.</p>}

                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<FaEnvelope color="gray.300" />}
                    />
                    <Input
                      type="number"
                      placeholder="Zip code"
                      variant="filled"
                      _hover={{ border: "2px solid teal" }}
                      {...register2("zip", {
                        required: true,
                        maxLength: "5",
                        pattern: /^\d{5}(?:[-\s]\d{4})?$/,
                      })}
                    />
                  </InputGroup>
                </FormControl>

                {errors2.desc && <p>Unesite poštanski broj.</p>}
              </Stack>

              <Stack
                direction="row"
                mt="4"
                w={["100%", "50%", "50%", "50%", "30%"]}
                mx="auto"
              >
                <Button
                  w="50%"
                  type="button"
                  onClick={() => {
                    ref1.current.click();
                  }}
                >
                  Back
                </Button>
                <Button
                  w="50%"
                  type="button"
                  disabled={!isValid2}
                  onClick={() => {
                    setToggleTab3(false);
                    ref3.current.click();
                  }}
                >
                  Next
                </Button>
              </Stack>
            </TabPanel>
            <TabPanel>
              {toggleEmailVal ? (
                <EmailValidation />
              ) : (
                <>
                  <Heading>Enter Business Details</Heading>
                  <Stack
                    spacing={4}
                    border="2px solid teal"
                    borderRadius="10"
                    p="10"
                    mt="10"
                    isRounded="true"
                    mx="auto"
                    w={["80vw", "80vw", "80vw", "80vw", "50vw"]}
                  >
                    <Heading fontSize="2xl">
                      Dodajte predmete koje predajete
                    </Heading>
                    <HStack>
                      <FormControl isRequired>
                        <Select ref={selectRef}>
                          {predmeti
                            .filter((i) => !tags.includes(i))
                            .map((predmet) => {
                              return <option value={predmet}>{predmet}</option>;
                            })}
                        </Select>
                      </FormControl>
                      <Button
                      type="button"
                        onClick={() => {
                          dodajTag(selectRef.current.value);
                        }}
                      >
                        Dodaj
                      </Button>
                    </HStack>
                    {endNOTag && <p>Unesite predmet .</p>}
                    <Grid
                      templateColumns={[
                        "repeat(2, 1fr)",
                        "repeat(2, 1fr)",
                        "repeat(3, 1fr)",
                        "repeat(4, 1fr)",
                      ]}
                      gap={3}
                      w="100%"
                    >
                      {tags.map((i: any) => (
                        <Tag
                          p="12"
                          w="100%"
                          h="10"
                          size="lg"
                          fontSize="1rem"
                          justify="center"
                          textAlign="center"
                          justifyContent="center"
                          _hover={{ backgroundColor: "#DC143C" }}
                          onClick={() => {
                            setTags(
                              tags.filter(
                                (e: any, indx: any) => indx != tags.indexOf(i)
                              )
                            );
                          }}
                        >
                          {i}
                        </Tag>
                      ))}
                    </Grid>
                    <FormControl isRequired>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          children={<FaDollarSign color="gray.300" />}
                        />
                        <Input
                          type="number"
                          placeholder="cijena/h"
                          variant="filled"
                          value={price}
                          onChange={(e: any) => {
                            let num: number = parseFloat(e.target.value);
                            let cleannum: number = Number.parseFloat(
                              num.toFixed(2)
                            );
                            return setPrice(cleannum);
                          }}
                          _hover={{ border: "2px solid teal" }}
                        />
                      </InputGroup>
                    </FormControl>
                  </Stack>

                  <Stack
                    direction="row"
                    mt="4"
                    mx="auto"
                    w={["100%", "50%", "50%", "50%", "30%"]}
                  >
                    <Button
                      w="50%"
                      type="button"
                      onClick={() => {
                        ref2.current.click();
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      w="50%"
                      type="submit"
                      
                    >
                      Završi
                    </Button>
                   
                  </Stack>
                  
                </>
                
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
      </form> </div>
  );
};

export default TutorForm;
