import { useState, useEffect } from "react";
import { db } from "../backend/firebase-config";

import toast from "react-hot-toast";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [repassword, setrepassword] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [cart, setcart] = useState([]);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const addusers = () => {
    const createUser = async () => {
      await addDoc(usersCollectionRef, {
        username: username,
        password: password,
        email: email,
        address: address,
        cart: cart,
      });
    };
  };

  //   const updateUser = async (id, age) => {
  //     const userDoc = doc(db, "users", id);
  //     const newFields = { age: age + 1 };
  //     await updateDoc(userDoc, newFields);
  //   };

  //   const deleteUser = async (id) => {
  //     const userDoc = doc(db, "users", id);
  //     await deleteDoc(userDoc);
  //   };

  // useEffect(() => {
  //   const getUsers = async () => {
  //     const data = await getDocs(usersCollectionRef);
  //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //   };

  //   getUsers();
  // }, []);



  return (
    <div className="signup">
      <label for="chk" aria-hidden="true">
        Sign up
      </label>
      <input
        type="text"
        name="txt"
        placeholder="User name"
        onChange={(event) => {
          setusername(event.target.value);
        }}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        required=""
        onChange={(event) => {
          setemail(event.target.value);
        }}
      />
      <input
        type="password"
        name="pswd"
        placeholder="Password"
        required=""
        onChange={(event) => {
          setpassword(event.target.value);
        }}
      />
      <input
        type="password"
        name="repswd"
        placeholder="Re-Enter Password"
        required=""
        onChange={(event) => {
          setrepassword(event.target.value);
        }}
      />
      <input
        type="address"
        name="pswd"
        placeholder="Address (*Include Your Zip code)"
        required=""
        onChange={(event) => {
          setaddress(event.target.value);
        }}
      />
      <button onClick={addusers}> Create User</button>
      {/* {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>Name: {user.name}</h1>
            <h1>Age: {user.age}</h1>
            <button
              onClick={() => {
                updateUser(user.id, user.age);
              }}
            >
              {" "}
              Increase Age
            </button>
            <button
              onClick={() => {
                deleteUser(user.id);
              }}
            >
              {" "}
              Delete User
            </button>
          </div>
        );
      })} */}
    </div>
  );
}

export default App;
