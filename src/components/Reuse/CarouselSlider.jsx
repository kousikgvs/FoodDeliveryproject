import React from "react";
import "../Reuse/Carousel.scss";
const carousel = () => {
  return (
    <div>
      <div className="body">
        <input type="radio" name="position" checked />
        <input type="radio" name="position" />
        <input type="radio" name="position" />
        <input type="radio" name="position" />
        <input type="radio" name="position" />
        <div className="main" id="carousel">
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
          <div class="item"></div>
        </div>
      </div>
    </div>
  );
};

export default carousel;
