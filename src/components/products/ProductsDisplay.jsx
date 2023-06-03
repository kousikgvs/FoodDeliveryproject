import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import productList from "../products";
import ProductCard from "../ProductCard";

const ProductDisplay = (props) => {
  const dispatch = useDispatch();

  const addToCartHandler = (options) => {
    dispatch({ type: "addToCart", payload: options });
    dispatch({ type: "calculatePrice" });
    toast.success("Added To Cart");
  };
  return (
    <div className="home">
      {" "}
      {productList.map((i) => (
        <ProductCard
          key={i.id}
          imgSrc={i.imgSrc}
          name={i.name}
          price={i.price}
          id={i.id}
          handler={addToCartHandler}
          hotelname = {props.hotelname}
          address = {props.address}
          hotelimage = {props.image}
        />
      ))}
    </div>
  );
};

export default ProductDisplay;
