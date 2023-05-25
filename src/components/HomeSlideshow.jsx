import React from "react";
import "../styles/home.scss";

const HomeSlideshow = (props) => {
  return (
    <div class="slide">
      <img
        class="slide-img"
        src={props.src}
      />
    </div>
  );
};

export default HomeSlideshow;
