import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  HStack,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Container,
} from "@chakra-ui/react";
import { db } from "../backend/firebase-config";
import { useEffect } from "react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { auth } from "../backend/firebase-config";
import { useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
export default function UserProfileEdit(): JSX.Element {
  const [fname, setfname] = useState("");
  const [lname, setlname] = useState("");
  const [addr, setaddr] = useState("");

  const [control, setcontrol] = useState(-1);
  // const [fname, setfname] = useState("");

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const updateUseraddr = async (id, address) => {
    const userDoc = doc(db, "users", id);
    const newFields = { address: address };
    await updateDoc(userDoc, newFields);
  };

  const updateUserfname = async (id, fname) => {
    const userDoc = doc(db, "users", id);
    const newFields = { firstname: fname };
    await updateDoc(userDoc, newFields);
  };

  const updateUserlname = async (id, lname) => {
    const userDoc = doc(db, "users", id);
    const newFields = { lastname: lname };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    console.log(users);
    console.log(control);
  }, []);
  const usersCollectionRef = collection(db, "users");
  const fnamectrl = () => {
    setcontrol(0);
    updatethedata();
  };
  const lnamectrl = () => {
    setcontrol(1);
    updatethedata();
  };
  const addrctrl = () => {
    setcontrol(2);
    updatethedata();
  };

  const updatethedata = () => {
    {
      users.map((user) => {
        return (
          <div>
            {auth.currentUser.displayName === user.email ? (
              control === 0 ? (
                updateUserfname(user.id, fname)
              ) : control === 1 ? (
                updateUserlname(user.id, lname)
              ) : control === 2 ? (
                updateUseraddr(user.id, addr)
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </div>
        );
      });
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          User Profile Edit
        </Heading>
        <FormControl id="userName">
          <FormLabel>User Icon</FormLabel>
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar
                size="xl"
                src="https://th.bing.com/th/id/OIP.OlnxO753VRgHKDLLDzCKoAHaHw?pid=ImgDet&rs=1"
              >
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Icon</Button>
            </Center>
          </Stack>
        </FormControl>

        <FormLabel>First Name *</FormLabel>
        <Container
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <FormControl id="userName" isRequired>
            <Input
              placeholder="Enter Your First Name"
              _placeholder={{ color: "gray.500" }}
              w="96%"
              onChange={(txt) => setfname(txt.target.value)}
              type="text"
            />
          </FormControl>
          <Button
            bg={"blue.400"}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={fnamectrl}
          >
            Update
          </Button>
        </Container>

        {/* ---------------------------------- */}
        <FormLabel>Last Name *</FormLabel>
        <Container
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <FormControl id="userName" isRequired>
            <Input
              placeholder="Enter Your Last Name"
              _placeholder={{ color: "gray.500" }}
              w="96%"
              onChange={(txt) => setlname(txt.target.value)}
              type="text"
            />
          </FormControl>
          <Button
            bg={"blue.400"}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={lnamectrl}
          >
            Update
          </Button>
        </Container>

        {/* ------------------------------------------ */}
        <FormLabel> Address *</FormLabel>
        <Container
          display={"flex"}
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <FormControl id="userName" isRequired>
            <Input
              placeholder="Enter Your Address"
              _placeholder={{ color: "gray.500" }}
              w="96%"
              onChange={(txt) => setaddr(txt.target.value)}
              type="text"
            />
          </FormControl>
          <Button
            bg={"blue.400"}
            color={"white"}
            justifyContent={"center"}
            alignItems={"center"}
            _hover={{
              bg: "blue.500",
            }}
            onClick={addrctrl}
          >
            Update
          </Button>
        </Container>
      </Stack>
    </Flex>
  );
}
