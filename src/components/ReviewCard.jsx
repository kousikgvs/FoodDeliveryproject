import React from "react";
import "../styles/home.scss";

const ReviewCard = (props) => {
  return (
    <div>
      <figure class="snip1390">
        <img src={props.imgsrc} alt={props.alt} class={props.class} />
        <figcaption>
          <h2>{props.h2}</h2>
          <h4>{props.h4}</h4>
          <blockquote>{props.blockquote}</blockquote>
        </figcaption>
      </figure>
    </div>
  );
};

export default ReviewCard;
