import React, { forwardRef } from "react";
import "./Headline.css";
import ThreeScene from "../ThreeScene/ThreeScene";
import arrow from "../../assets/imgs/arrow.png";

const Headline = forwardRef((props, ref) => {
  return (
    <div ref={ref} className="Headline_Container">
      <div className="arrow_down">
        <img src={arrow} alt="" />
      </div>

      <div className="z_one">
        <div>
          <h2>A nova era</h2>
          <span>gamer</span>
          <h2>começa aqui</h2>
        </div>
      </div>
    
      <ThreeScene />
    </div>
  );
});

export default Headline;
