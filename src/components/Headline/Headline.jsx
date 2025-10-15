import React from "react";
import "./Headline.scss";
import ThreeScene from "../ThreeScene/ThreeScene";
import arrow from "../../assets/imgs/arrow.png";

function Headline() {
    return (
        <>
            <div className="Headline_Container">
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
        </>
    );
}

export default Headline;