import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import "../styles/cart.scss";
import { db } from "../backend/firebase-config";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
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
import { Textarea } from "@chakra-ui/react";

const Cart = () => {
  const [loading, setLoading] = useState(true);

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
  const lst = [];
  const [time, setTime] = useState(new Date());
  const [total1, setbill] = useState(0);
  const [subtotal1, setsubtotal] = useState(0);
  const [shipping1, setshipping] = useState(0);
  const [tax1, settax] = useState(0);

  const [users, setUsers] = useState([]);
  const { login } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const auth = getAuth();
  const address1 = "dammaiguda";
  const usersCollectionRef = collection(db, "orders");
  const usersCollectionRef1 = collection(db, "users");
  const [addr, setaddr] = useState("hd");
  const { cartItems, subTotal, tax, shipping, total } = useSelector(
    (state) => state.cart
  );
  const dispatch = useDispatch();

  const increment = (id) => {
    dispatch({
      type: "increment",
      payload: { id },
    });
    dispatch({ type: "calculatePrice" });
  };
  const decrement = (id) => {
    dispatch({
      type: "decrement",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };
  const deleteHandler = (id) => {
    dispatch({
      type: "deleteFromCart",
      payload: id,
    });
    dispatch({ type: "calculatePrice" });
  };
  const { availableplaces } = useSelector((state) => state.cart);
  console.log(availableplaces);
  const updatebill = async (id, bill) => {
    const userDoc = doc(db, "users", id);
    const newFields = { total: bill };
    await updateDoc(userDoc, newFields);
  };

  const updatesubtotal = async (id, subtotal) => {
    const userDoc = doc(db, "users", id);
    const newFields = { subtotal: subtotal };
    await updateDoc(userDoc, newFields);
  };

  const updatetax = async (id, tax) => {
    const userDoc = doc(db, "users", id);
    const newFields = { tax: tax };
    await updateDoc(userDoc, newFields);
  };

  const updateshipping = async (id, shipping) => {
    const userDoc = doc(db, "users", id);
    const newFields = { shipping: shipping };
    await updateDoc(userDoc, newFields);
  };

  const incrementItem = async (id, quantity) => {
    const userDoc = doc(db, "users", id);
    const newFields = { shipping: shipping };
    await updateDoc(userDoc, newFields);
  };

  const createUser = async () => {
    await addDoc(usersCollectionRef, {
      Customername: auth.currentUser.displayName,
      currentTime: time.toLocaleTimeString(),
      Items: cartItems,
      Address: "j",
    });
  };

  const makepayment = () => {
    if (login === false) {
      alert("Please login to continue");
    } else {
      if (cartItems.length === 0) {
        alert("The Cart is empty , Please select atleast 1 Item");
      } else {
        if (addr === "") {
          alert("Please Add Address to Place an Order");
        } else {
          navigate("/user/OrderPlaced");
          createUser();
        }
      }
    }
  };
  const updatecart = async (id, cartItems) => {
    const userDoc = doc(db, "users", id);
    const newFields = { cart: cartItems };
    await updateDoc(userDoc, newFields);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef1);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    console.log(users);
    {
      users.map((user) => {
        return (
          <div>
            {login ? (
              auth.currentUser.displayName === user.email ? (
                (setaddr(user.address),
                console.log("my address is " + addr),
                updatecart(user.id, cartItems),
                updatebill(user.id, total),
                updatetax(user.id, tax),
                updatesubtotal(user.id, subTotal),
                console.log("The cart is"),
                console.log(user.cart))
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            ;
          </div>
        );
      });
    }
    getUsers();
  }, [cartItems]);

  return (
    <div className="cart">
      <main>
        <>
          <>
            {cartItems.length > 0 ? (
              cartItems.map((i) => (
                <CartItem
                  imgSrc={i.imgSrc}
                  name={i.name}
                  price={i.price}
                  qty={i.quantity}
                  id={i.id}
                  key={i.id}
                  decrement={decrement}
                  increment={increment}
                  deleteHandler={deleteHandler}
                />
              ))
            ) : (
              <>
                <h1
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                  }}
                >
                  The Cart is Empty
                </h1>
              </>
            )}
          </>
        </>

        <>{}</>
      </main>

      <aside>
        <h2>Subtotal: ${subTotal}</h2>
        <h2>Shipping: ${shipping}</h2>
        <h2>Tax: ${tax}</h2>
        <h2>Total: ${total}</h2>
        <button onClick={makepayment}>Check Out </button>
      </aside>
    </div>
  );
};

const CartItem = ({
  imgSrc,
  name,
  price,
  qty,
  decrement,
  increment,
  deleteHandler,
  id,
}) => (
  <div className="cartItem">
    <img src={imgSrc} alt="Item" />
    <article>
      <h3>{name}</h3>
      <p>${price}</p>
    </article>

    <div>
      <button onClick={() => decrement(id)}>-</button>
      <p>{qty}</p>
      <button onClick={() => increment(id)}>+</button>
    </div>

    <AiFillDelete onClick={() => deleteHandler(id)} />
  </div>
);

export default Cart;
