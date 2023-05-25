import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../backend/firebase-config";
import "../styles/yourOrders.scss";
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
const YourOrders = () => {
  const usersCollectionRef = collection(db, "orders");
  const [users, setUsers] = useState([]);
  const { login } = useSelector((state) => state.cart);

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    console.log(users);
    getUsers();
  }, []);
  return (
    <div>
      <h1> Your Orders </h1>
      {login ? (
        users.map((i) =>
          auth.currentUser.displayName === i.Customername ? (
            <div>
              <div className="yourOrders">
                <div className="orderItem">
                  <article>
                    <h3>
                      <span className="subheading">Email:</span>
                      {i.Customername}
                    </h3>
                    <div>
                      <p>
                        <span className="subheading">Current Time:</span>
                        {i.currentTime}
                      </p>
                      <p>
                        <span className="subheading">Address:</span>
                        {i.Address}
                      </p>
                      <p>
                        <span className="subheading">Items Ordered:</span>
                        {Array.isArray(i.Items) && i.Items.length > 0 ? (
                          <>
                            <span className="subheading"></span>
                            {i.Items.length}
                          </>
                        ) : (
                          <div className="hidediv"></div>
                        )}
                      </p>
                      <p>
                        {Array.isArray(i.Items) && i.Items.length > 0 ? (
                          <div className="orderProduct">
                            {i.Items.map((i) => (
                              <>
                                <div className="orderItemf">
                                  <div className="imageDiv">
                                    <img
                                      src={i["imgSrc"]}
                                      width={60}
                                      height={60}
                                    />
                                  </div>
                                  <div className="ItemsDiv">
                                    <div>
                                      <span className="subheading">
                                        Item Name :
                                      </span>
                                      {i["name"]}
                                    </div>
                                    <div>
                                      <span className="subheading">
                                        Item price :
                                      </span>
                                      <span>$</span>
                                      {i["price"]}
                                    </div>
                                    <div>
                                      <span className="subheading">
                                        Item Quantity :
                                      </span>
                                      {i["quantity"]}
                                    </div>
                                  </div>
                                </div>
                              </>
                            ))}
                          </div>
                        ) : (
                          <div className="hidediv"></div>
                        )}
                      </p>
                      <p>
                        <span className="subheading">Order Status :</span>
                        {"Pending"}
                      </p>
                    </div>
                  </article>
                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default YourOrders;
