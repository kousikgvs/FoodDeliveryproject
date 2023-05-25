import React from "react";

import "../styles/products.scss";
import dosa from "../Icons/masala-dosa.png";
import biryani from "../Icons/biryani.png";
import ramen from "../Icons/ramen.png";
import pizza from "../Icons/pizza.png";
import burger from "../Icons/burger.png";
import { useState } from "react";
import Tiffins from "./products/Tiffins";
import Biryani from "./products/Biryani";
import Burger from "./products/Burger";
import Noodles from "./products/Noodles";
import Pizza from "./products/pizza";

const Items = () => {
  const [t, sett] = useState(true);
  const [b, setb] = useState(false);
  const [n, setn] = useState(false);
  const [p, setp] = useState(false);
  const [bu, setbu] = useState(false);
  console.log(t);
  console.log(b);

  console.log(n);
  console.log(p);

  return (
    <div>
      <div className="products">
        <div className="main">
          {t ? (
            <Tiffins />
          ) : b ? (
            <Biryani />
          ) : n ? (
            <Noodles />
          ) : p ? (
            <Pizza />
          ) : bu ? (
            <Burger />
          ) : (
            <></>
          )}
        </div>

        <div className="aside">
          <h2>Available Items </h2>
          <h2
            className="flexedprod"
            onClick={() => {
              sett(true);
              setb(false);
              setn(false);
              setp(false);
              setbu(false);
            }}
          >
            Tiffins{" "}
            <span>
              <img src={dosa} />
            </span>
          </h2>
          <h2
            className="flexedprod"
            onClick={() => {
              sett(false);
              setb(true);
              setn(false);
              setp(false);
              setbu(false);
            }}
          >
            Biryani{" "}
            <span>
              <img src={biryani} />
            </span>
          </h2>
          <h2
            className="flexedprod"
            onClick={() => {
              sett(false);
              setb(false);
              setn(true);
              setp(false);
              setbu(false);
            }}
          >
            Noodles{" "}
            <span>
              <img src={ramen} />
            </span>
          </h2>
          <h2
            className="flexedprod"
            onClick={() => {
              sett(false);
              setb(false);
              setn(false);
              setp(true);
              setbu(false);
            }}
          >
            Pizza{" "}
            <span>
              <img src={pizza} />
            </span>
          </h2>
          <h2
            className="flexedprod"
            onClick={() => {
              sett(false);
              setb(false);
              setn(false);
              setp(false);
              setbu(true);
            }}
          >
            Burger{" "}
            <span>
              <img src={burger} />
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Items;
