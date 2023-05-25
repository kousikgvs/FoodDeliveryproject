import React, { useState, useEffect } from "react";
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

const Payments = () => {
  const usersCollectionRef = collection(db, "users");
  const auth = getAuth();

  const [bill, setbill] = useState(0);
  const getbill = () => {
    {
      users.map((user) => {
        return (
          <div>
            {auth.currentUser.displayName === user.email ? (
              setbill(user.subtotal)
            ) : (
              <></>
            )}
          </div>
        );
      });
    }
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
    // getbill();
  }, []);

  return (
    <div className="paymentbody">
      {" "}
      <div class="wrapper">
        <h2>Payment Form</h2>
        <form method="POST">
          <h4>Account</h4>
          <div class="input-group">
            <div class="input-box">
              <input
                type="email"
                placeholder="Email Adress"
                required
                class="name"
              />
              <i class="fa fa-envelope icon"></i>
            </div>
          </div>
          <div class="input-group">
            <div class="input-box">
              <h4> Date of Birth</h4>
              <input type="text" placeholder="DD" class="dob" />
              <input type="text" placeholder="MM" class="dob" />
              <input type="text" placeholder="YYYY" class="dob" />
            </div>
            <div class="input-box">
              <h4> Gender</h4>
              <input type="radio" id="b1" name="gendar" checked class="radio" />
              <label for="b1">Male</label>
              <input type="radio" id="b2" name="gendar" class="radio" />
              <label for="b2">Female</label>
            </div>
          </div>
          <div class="input-group">
            <div class="input-box">
              <h4>Payment Details</h4>
              <input type="radio" name="pay" id="bc1" checked class="radio" />
              <label for="bc1">
                <span>
                  <i class="fa fa-cc-visa"></i> Credit Card
                </span>
              </label>
              <input type="radio" name="pay" id="bc2" class="radio" />
              <label for="bc2">
                <span>
                  <i class="fa fa-cc-paypal"></i> Paypal
                </span>
              </label>
            </div>
          </div>
          <div class="input-group">
            <div class="input-box">
              <input
                type="tel"
                placeholder="Card Number"
                required
                class="name"
              />
              <i class="fa fa-credit-card icon"></i>
            </div>
          </div>
          <div class="input-group">
            <div class="input-box">
              <input type="tel" placeholder="Card CVC" required class="name" />
              <i class="fa fa-user icon"></i>
            </div>
            <div class="input-box">
              <select>
                <option>01 jun</option>
                <option>02 jun</option>
                <option>03 jun</option>
              </select>
              <select>
                <option>2020</option>
                <option>2021</option>
                <option>2022</option>
              </select>
            </div>
          </div>
          <div class="input-group">
            <div class="input-box">
              <button type="submit">PAY  NOW</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payments;