import charka, {
  background,
  Box,
  Button,
  Checkbox,
  Flex,
  flexbox,
  FormControl,
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



type TutorStep1 = {
  firstName: string,
  lastName: string,
  email: RegExp,
  password: string,
};

type TutorStep2 = {
  desc: string,
  phoneNumber: number,
  address: string,
  zipCode: number,
}

interface Props {}

const TutorForm: React.FC = (props: Props) => {
  const [tags, setTags] = useState<any>([]);

  const [endNOTag,setEndNoTag]= useState<Boolean>(false)
  const ref1 = useRef<any>(null);

  const ref2 = useRef<any>(null);

  const ref3 = useRef<any>(null);

  const selectRef = useRef<any>(null);

  // const [toggleActive,setToggleActive] = useState(true)
  const [toggleTab2, setToggleTab2] = useState(true);
  const [toggleTab3, setToggleTab3 ] = useState(true);

  const [cijena, setCijena] = useState(0)

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const {watch,register, formState:{errors,isValid}} = useForm<TutorStep1>({mode:"all"})
  const {watch : watch2 ,register : register2, formState :{errors : errors2 ,isValid : isValid2} } = useForm<TutorStep2>({mode:"all"})


  useEffect(() => { 
    ref2.current.click();
  }, [toggleTab2]);

  useEffect(() => {
    ref3.current.click();
  }, [toggleTab3]);

  function dodajTag(value: any) {
    setTags([...tags, value]);
  }

  function handleSubmit(){
    setEndNoTag(tags.length===0)
    const post = {...watch(),...watch2(),tags:[...tags],cijena}
    console.log(post)
  }

  return (
    <VStack>
      <Stack backgroundColor="teal" w="100vw" mb="50">
        <Heading
          fontSize="50px"
          isTruncated
          mt="20"
          color="white"
          backgroundColor="teal"
          h="30vh"
        >
          Postanite instruktor u 3 koraka
        </Heading>
      </Stack>
      <Tabs isFitted colorScheme="teal" mt="20"  w="80vh" mx="auto">
        <TabList mx="auto" defaultIndex={0} justifyContent="center">
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
        <TabPanels >
         
         
          <TabPanel >
            <Heading>Registracija</Heading>
            <Stack
              spacing={4}
              border="2px solid teal"
              borderRadius="10"
              p="10"
              mt="10"
              isRounded="true"
             
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
                    {...register("firstName",{required:true,maxLength:"30"})}
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
                    {...register("lastName",{required:true,maxLength:"30"})}
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
                    {...register("email",{required:true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/})}
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
                    {...register("password",{required:true, minLength:"6"})}
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
              mb="20"
              disabled = {!isValid}
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
              maxW = {{md:"2xl",sm:"xs"}}
              spacing={4}
              border="2px solid teal"
             
              borderRadius="10"
              p="10"
              mt="10"
              isRounded="true"
              mx="auto"
            >
              <FormControl isRequired>
                <Textarea
                  placeholder="A simple description about you..."
                  variant="filled"
                  _hover={{ border: "2px solid teal" }}
                  {...register2("desc",{required:true, maxLength:"100"})}

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
                    {...register2("phoneNumber",{required:true, maxLength:"30"})}
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
                    {...register2("address",{required:true, maxLength:"50"})}
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
                    {...register2("zipCode",{required:true, maxLength:"5"})}
                  />
                </InputGroup>
              </FormControl>

              {errors2.desc && <p>Unesite poštanski broj.</p>}


            </Stack>

            <Button
              mt="10"
              w="2xs"
              onClick={() => {
                ref1.current.click();
              }}
            >
              Back
            </Button>
            <Button
              mt="10"
              w="2xs"
              disabled = {!isValid2}
              onClick={() => {
                setToggleTab3(false);
                ref3.current.click();
                
              }}
            >
              Next
            </Button>
          </TabPanel>
          <TabPanel>
            <Heading>Enter Business Details</Heading>
            <Stack
              spacing={4}
              border="2px solid teal"
              borderRadius="10"
              p="10"
              mt="10"
              isRounded="true"
            >
              <Heading fontSize="2xl">Dodajte predmete koje predajete</Heading>
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
                  onClick={() => {
                    dodajTag(selectRef.current.value);
                  }}
                >
                  Dodaj
                </Button>
              </HStack>
              {endNOTag && <p>Unesite predmet .</p>}
              <Stack direction="row">
                {tags.map((i: any) => ( 
                   
                  <Tag
                    size="lg"
                    p="5"
                    w="10vw"
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
                
              </Stack>
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
                       value={cijena}
                      onChange={(e:any)=>{
                        let num:number = parseFloat(e.target.value)
                        let cleannum:number = Number.parseFloat(num.toFixed(2))
                        return setCijena(cleannum)
                      }}
                       _hover={{ border: "2px solid teal" }}
                       
                     />
                   </InputGroup>
                 </FormControl>
            </Stack>

            <Button
              mt="10"
              w="2xs"
              onClick={() => {
                ref2.current.click();
              }}
            >
              Back
            </Button>
            <Button mt="10" w="2xs" onClick={() => {handleSubmit()}}>
              Završi
            </Button>
          </TabPanel>
         
          
        </TabPanels>
      </Tabs>
    </VStack>
  );
};

export default TutorForm;
