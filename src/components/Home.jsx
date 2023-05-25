import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Carousel from "./Reuse/CarouselSlider";
import mimage from "../components/Charcoal & Blue Simple Food Delivery Instagram Story.png";
import "../styles/home.scss";
import Infcarouselcard from "./Infcarouselcard";
import HomeSlideshow from "./HomeSlideshow";
import ReviewCard from "./ReviewCard";
import { Button, Textarea } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import { Slide, Zoom, Flip, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomeFeatures from "./HomeFeatures";
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

const Home = () => {
  const auth = getAuth();
  const { login } = useSelector((state) => state.cart);
  const [n, setrn] = useState("");
  const [rev, setrev] = useState("");
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
  const addreview = () => {
    login
      ? toastNotify("Thanks Your response Has Been Noted")
      : toastNotify("Please Login Before adding a Review");
  };
  const usersCollectionRef = collection(db, "reviews");

  const addReview = async () => {
    alert("clicked");
    await addDoc(usersCollectionRef, {
      emailId: auth.currentUser.displayName,
      name: n,
      Review: rev,
    });
  };
  const { Lattitude } = useSelector((state) => state.cart);
  const { Longitude } = useSelector((state) => state.cart);

  return (
    <div className="homebody">
      <div className="homepage">
        <img
          className="mainimage"
          src={mimage}
          height={600}
          width={350}
          style={{
            marginLeft: "13px",
          }}
        />
        <div class="container">
          <div class="content">
            <div class="slideshow">
              <div class="slideshow-wrapper">
                <HomeSlideshow src="https://www.fastfoodmenuprices.com/wp-content/uploads/2017/01/KFC-5-Fill-Up.jpg" />
                <HomeSlideshow src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-offer-banner-design-template-ef081783b8a58d80662aae948311ef45_screen.jpg?ts=1615117868" />
                <HomeSlideshow src="https://www.fastfoodmenuprices.com/wp-content/uploads/2017/01/KFC-5-Fill-Up.jpg" />
                <HomeSlideshow src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/food-offer-banner-design-template-ef081783b8a58d80662aae948311ef45_screen.jpg?ts=1615117868" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <ChakraProvider theme={theme}>
          <HomeFeatures />
        </ChakraProvider>
      </div> */}

      <div className="clientsheading">Our Clients :</div>

      <div>
        <div class="slider">
          <div class="slide-track">
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/6.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/7.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/2.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/3.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/4.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/5.png" />
            <Infcarouselcard src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/557257/1.png" />
          </div>
        </div>
      </div>

      <div className="clientsheading">Client Reviews :</div>
      <div className="clientreviews">
        {/*  Card 1  */}
        <ReviewCard
          imgsrc="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
          alt="profile-sample3"
          class="profile"
          h2="Eleanor Crisp"
          h4="UX Design"
          blockquote="Dad buried in landslide! Jubilant throngs fill streets! Stunned
          father inconsolable - demands recount!"
        />

        {/*  Card 2  */}
        <ReviewCard
          imgsrc="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
          alt="profile-sample3"
          class="profile"
          h2="Norman"
          h4="Accountant"
          blockquote="Wormwood : Calvin, how about you? Calvin : Hard to say ma'am. I
          think my cerebellum has just fused."
        />

        {/*  Card 3 */}
        <ReviewCard
          imgsrc="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
          alt="profile-sample3"
          class="profile"
          h2="Eleanor Crisp"
          h4="UX Design"
          blockquote="The strength to change what I can, the inability to accept what I
          can't and the incapacity to tell the difference."
        />

        {/*  Card 4 */}
        <ReviewCard
          imgsrc="https://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
          alt="profile-sample3"
          class="profile"
          h2="Eleanor Crisp"
          h4="UX Design"
          blockquote="Dad buried in landslide! Jubilant throngs fill streets! Stunned
          father inconsolable - demands recount!"
        />
      </div>
      {}
      <div></div>
      <div className="addareview">
        <div className="clientsheading">Add a Review :</div>

        <input
          placeholder="Enter Your name"
          onChange={(event) => setrn(event.target.value)}
        />
        <Textarea
          placeholder="Enter your Review"
          onChange={(event) => setrev(event.target.value)}
        />
        {login === true ? (
          <>
            <Button
              className="subbtn"
              style={{ backgroundColor: "green" }}
              onClick={addReview}
            >
              Submit
            </Button>
          </>
        ) : (
          <>
            <Button
              className="subbtn"
              style={{ backgroundColor: "red", color: "white" }}
            >
              Submit
            </Button>
            <ToastContainer />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
