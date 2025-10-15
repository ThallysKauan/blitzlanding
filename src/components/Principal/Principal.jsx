import React from "react";
import "./Principal.scss"
import {gsap} from "gsap";
import logo from "../../assets/imgs/logo.png";
import { ScrollTrigger } from "gsap/ScrollTrigger";


function Principal() {


    return(
        <>
            <div className="container_conteudo">
                <div className="part_one">
                    <img className="image_test" src={logo} alt="" />
                </div>
            </div>
        </>
    );
}

export default Principal;