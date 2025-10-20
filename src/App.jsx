import { useState, useRef } from "react";
import React from "react";
import "./App.css";
import "./fonts.css";
import Navbar from "./components/Navbar/Navbar";
import Headline from "./components/Headline/Headline";
import Principal from "./components/Principal/Principal";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

function App() {
  gsap.registerPlugin(ScrollTrigger);

  const HeadlineRef = useRef();
  const PrincipalRef = useRef();
  const PrincipalRefScroll = useRef();

  useGSAP(() => {
    // Headline fade out e pin
    gsap.to(HeadlineRef.current, {
      scrollTrigger: {
        trigger: HeadlineRef.current,
        endTrigger: PrincipalRefScroll.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
        
      },
      opacity: 0,
    });

    gsap.to(PrincipalRef.current.container, {
      scrollTrigger: {
        trigger: PrincipalRef.current.container,
        endTrigger: PrincipalRefScroll.current,
        start: "top top",
        end: "top bottom",
        scrub: true,
        pin: true,
        markers: true
      },
      opacity: 1,
    });


  }, []);

  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <main>
        <Headline ref={HeadlineRef} />
        <Principal ref={PrincipalRef} />
        <div
          className="scroll1"
          ref={PrincipalRefScroll}
          style={{ height: "100vh" }}
        ></div>
      </main>
    </>
  );
}

export default App;
