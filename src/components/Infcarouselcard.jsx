import React from "react";
import "../styles/home.scss";

const Infcarouselcard = (props) => {
  return (
    <div class="slide1">
      <img
        src={props.src}
        height="100"
        width="250"
        alt=""
      />
    </div>
  );
};

export default Infcarouselcard;
