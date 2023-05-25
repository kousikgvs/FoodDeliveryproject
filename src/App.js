import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import Cart from "./components/Cart";
import Register from "./components/Register";
import Footer from "./components/Footer";
import { ChakraProvider, theme } from "@chakra-ui/react";
import "./styles/app.scss";
import Items from "./components/Items";
import Login from "./components/login";
import Help from "./components/Help";
import EditProfile from "./components/EditProfile";
import { auth } from "./backend/firebase-config";
import Payments from "./components/Payments";
import Success from "./components/OrderPlaced";
import YourOrders from "./components/YourOrders";
import Maps from "./components/Maps";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/cart"
          element={
            <>
              <Header />
              <Cart />
            </>
          }
        />
        <Route
          path="/items"
          element={
            <>
              <Header />
              <Items />
            </>
          }
        />

        <Route
          path="/help"
          element={
            <>
              <Header />
              <Help />
            </>
          }
        />
        <Route
          path="/yourorders"
          element={
            <>
              <YourOrders />
            </>
          }
        />
        <Route
          path="/register/signup"
          element={
            <>
              <ChakraProvider theme={theme}>
                <Register />
              </ChakraProvider>
            </>
          }
        />
        <Route
          path="/register/login"
          element={
            <>
              <ChakraProvider theme={theme}>
                <Login />
              </ChakraProvider>
            </>
          }
        />

        <Route
          path={`/user/editprofile`}
          element={
            <>
              <ChakraProvider theme={theme}>
                <EditProfile />
              </ChakraProvider>
            </>
          }
        />
        <Route
          path={`/user/OrderPlaced`}
          element={
            <>
              <ChakraProvider theme={theme}>
                <Success />
              </ChakraProvider>
            </>
          }
        />
        <Route
          path={`/maps`}
          element={
            <>
              <Maps />
            </>
          }
        />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
