import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

import { db } from "../backend/firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase-config";

export default function SignupCard() {
  const [firstName, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [copassword, setcopassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showcoPassword, setShowcoPassword] = useState(false);
  const toastNotify = (message) => {
    toast(message, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "005",
    });
  };
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user);
      await updateProfile(auth.currentUser, { displayName: email }).catch(
        (err) => console.log(err)
      );
      toastNotify("Signed Up");
      createUser();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return toastNotify("The Email Already Exists");
      } else if (error.code === "auth/invalid-email") {
        return toastNotify("The Email Address Provided is Invalid");
      }
    }
  };
  const signup = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // send verification mail.
        userCredential.user.sendEmailVerification();
        auth.signOut();
        alert("Email sent");
      })
      .catch(alert);
  };
  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      firstname: firstName,
      lastname: lastname,
      email: email,
      password: password,
      address: "",
      cart: [],
      total: 0,
      subtotal: 0,
      tax: 0,
      shipping: 0,
      role: "user",
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bgGradient="linear(to-b, #209CFF, #68E0CF)"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(txt) => setfirstname(txt.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(txt) => setlastname(txt.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(txt) => setemail(txt.target.value)}
              />
            </FormControl>

            {/*  Password Field  */}
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  onChange={(txt) => setpassword(txt.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            {/* COnfirm Password Field */}
            <FormControl id="copassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showcoPassword ? "text" : "password"}
                  onChange={(txt) => setcopassword(txt.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowcoPassword((showcoPassword) => !showcoPassword)
                    }
                  >
                    {showcoPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  if (
                    firstName !== "" &&
                    lastname !== "" &&
                    email !== "" &&
                    password !== "" &&
                    copassword !== ""
                  ) {
                    if (password === copassword) {
                      if (password.length >= 8) {
                        register();
                        navigate("/register/login");
                      } else {
                        toastNotify(
                          " ⚠️ Minimum Password should be of length 8"
                        );
                      }
                    } else {
                      toastNotify("⚠️ The Password Fields are not Matching");
                    }
                  } else {
                    toastNotify("⚠️ Some Fields are empty");
                  }
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"} onClick={toastNotify}>
                Already a user?{" "}
                <Link
                  onClick={() => navigate("/register/login")}
                  color={"blue.400"}
                >
                  Login
                </Link>
              </Text>
              <ToastContainer />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
