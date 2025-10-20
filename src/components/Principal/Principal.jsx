import React, { forwardRef, useRef, useImperativeHandle } from "react";
import "./Principal.scss";
import logo from "../../assets/imgs/logo.png";

const Principal = forwardRef((props, ref) => {
  const containerRef = useRef();
  const partOneRef = useRef();

  useImperativeHandle(ref, () => ({
    container: containerRef.current,
    partOne: partOneRef.current
  }));

  return (
    <div ref={containerRef} className="container_conteudo">
      <div ref={partOneRef} className="part_one">
        <img className="image_test" src={logo} alt="" />
      </div>
    </div>
  );
});

export default Principal;
