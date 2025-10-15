import React from "react";
import "./Navbar.scss";
import logo from "../../../src/assets/imgs/logo.png";


function Navbar() {
    return (
        <div className="navbar_container_avo">
            <div className="navbar_desktop">
                <nav className="nav_container">
                    <a className="logo_image_side" href="#">
                        <img src={logo} alt="logo" />
                    </a>


                    <ul>
                        <li className="active"><a href="">games</a></li>
                        <li><a href="">inkpay</a></li>
                        <li><a href="">support</a></li>
                        <li><a href="">studio</a></li>
                    </ul>

                    <div className="buttons_cta">
                        <a href="">Participar Agora!</a>
                    </div>
                </nav>
            </div>

            <div className="navbar_mobile">
                <nav className="container_mobile">
                    <a className="logo_image_side" href="">
                        <img src={logo} alt="logo" />
                    </a>

                    <div className="right_side">
                        <a href="">Participar!</a>
                        <div className="hamburguer">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>

                </nav>
            </div>
        </div>



    );
}

export default Navbar;