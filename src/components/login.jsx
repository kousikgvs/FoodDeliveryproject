import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { FirebaseApp } from "firebase/app";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  doPasswordReset,
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
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";

import { useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase-config";
import { useDispatch, useSelector } from "react-redux";

export default function Login() {
  const { login } = useSelector((state) => state.cart);
  const usersCollectionRef = collection(db, "users");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
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
  const signIn = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
      toastNotify("Signed In");
      dispatch({ type: "makelogin" });
      console.log(login);
      await updateProfile(auth.currentUser, { displayName: email }).catch(
        (err) => console.log(err)
      );
      navigate("/");
      console.log(
        "The Current User is ------>>>>>" + auth.currentUser.displayName
      );
    } catch (error) {
      console.log(error.message);
      if (error.code === "auth/invalid-email") {
        toastNotify("Invalid Email");
      } else if (error.code === "auth/wrong-password") {
        toastNotify("Invalid Password");
      } else if (error.code === "auth/user-not-found") {
        toastNotify("User Not Found");
      } else if (error.code === "auth/network-request-failed") {
        toastNotify("Please connect to Internet");
      } else if (error.code === "auth/too-many-requests") {
        toastNotify(
          "Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later"
        );
      }
    }
  };

  // useEffect(() => {
  //   const db = firebase.firestore();
  //   const userCollection = db.collection("users");
  //   const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       const { uid } = user;

  //     }
  //   });
  //   return unsubscribe;
  // }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bgGradient="linear(to-b, #209CFF, #68E0CF)"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text> */}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                onChange={(event) => setemail(event.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                onChange={(event) => setpassword(event.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={() => {
                  console.log(email);
                  console.log(password);

                  signIn();
                }}
              >
                Sign in
              </Button>
              <ToastContainer />
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
