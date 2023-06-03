import React, { Component } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiShoppingBag } from "react-icons/fi";
import { useSelector } from "react-redux";
import { color } from "framer-motion";
import { FirebaseApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import logo from "../components/online-shop.png";
import { auth } from "../backend/firebase-config";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import GetCurrLoc from "./GetCurrLoc";

const Header = () => {
  const showAllToasts = () => {
    toast.success("I'm never gonna toast you!");
    toast.error("I'm never gonna toast you!");
    toast.warning("I'm never gonna toast you!");
    toast.info("I'm never gonna toast you!");
  };
  const navigate = useNavigate();
  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  const { login } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  // const setlattitude = (lattitude) => {
  //   dispatch({
  //     type: "setlattitude",
  //     payload: lattitude,
  //   });
  // };

  const setsignout = () => {
    dispatch({ type: "makesignout" });
  };
  const signUserOut = async () => {
    setsignout();
    toast.success("I'm never gonna toast you!");
    await signOut(auth);
  };

  console.log(login);
  console.log(auth.currentUser?.email);

  return (
    <div className="topnav" id="myTopnav">
      <a>
        {" "}
        <a>
          <Link to={"/"}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <img src={logo} width={50} />
              <p className="logotext"> Food Ordering Website</p>
            </div>
          </Link>
        </a>
        <a>
          <div
            style={{
              display: "flex",
              gap: "6px",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p className="logotext">Your Current Location :</p>
            <p className="logotext">
              <GetCurrLoc />
            </p>
          </div>
        </a>
      </a>

      <a>
        <a>
          <Link to={"/"}>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span class="material-symbols-outlined">home</span>
              <p style={{ fontFamily: "'Roboto Mono', monospace" }}>Home</p>
            </div>
          </Link>
        </a>

        <a>
          <Link to={"/items"}>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <span class="material-symbols-outlined">inventory_2</span>
              <p style={{ fontFamily: "'Roboto Mono', monospace" }}>Items</p>
            </div>
          </Link>
        </a>

        <a>
          <Link to={"/cart"}>
            <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
              <span class="material-symbols-outlined">shopping_cart</span>
              <p style={{ fontFamily: "'Roboto Mono', monospace" }}>Cart</p>
            </div>
          </Link>
        </a>

        {login ? (
          <a>
            <Link to={"/yourorders"}>
              <div
                style={{ display: "flex", gap: "5px", alignItems: "center" }}
              >
                <span class="material-symbols-outlined">draft_orders</span>
                <p style={{ fontFamily: "'Roboto Mono', monospace" }}>Orders</p>
              </div>
            </Link>
          </a>
        ) : (
          <></>
        )}

        {login ? (
          <a>
            <div class="dropdown">
              <button className="dropbtn">
                <img
                  style={{ borderRadius: "50%", width: "30px" }}
                  src={
                    "https://th.bing.com/th/id/OIP.OlnxO753VRgHKDLLDzCKoAHaHw?pid=ImgDet&rs=1"
                  }
                />
                {auth.currentUser?.email}
              </button>
              <div className="hovmenu">
                <div className="dropdown-content">
                  <a
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                    onClick={() => navigate(`/user/editprofile`)}
                  >
                    <span class="material-symbols-outlined">edit_note</span>
                    <span>Edit Profile</span>
                  </a>
                  <a
                    onClick={signUserOut}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "20px",
                    }}
                  >
                    {" "}
                    <span class="material-symbols-outlined">logout</span>
                    Signout
                  </a>
                </div>
              </div>
            </div>
          </a>
        ) : (
          <>
            <a>
              <Link
                to={"/register/signup"}
                style={{ display: "flex", flexDirection: "row", gap: "10px" }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "5px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span class="material-symbols-outlined">login</span>
                  <p style={{ fontFamily: "'Roboto Mono', monospace" }}>
                    Login
                  </p>
                </div>
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  {" "}
                  /{" "}
                </div>
                <div
                  style={{ display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <span class="material-symbols-outlined">person_add</span>
                  <p style={{ fontFamily: "'Roboto Mono', monospace" }}>
                    Signup
                  </p>
                </div>
              </Link>
            </a>
          </>
        )}
      </a>

      <Link className="icon" onClick={myFunction}>
        <i class="fa fa-bars"></i>
      </Link>
    </div>
  );
};

export default Header;
