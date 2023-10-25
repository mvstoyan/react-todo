import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import witch from "../../public/img/witch.svg";
import doIt from "../../public/img/doIt.png";
import style from "./animation.module.css";
import PropTypes from "prop-types";

function Animation() {
  const boxRef = useRef();
  const animateBox = () => {
    gsap.from(boxRef.current, {
      x: -400,
      delay: 1,
      ease: "power2.inOut",
      opacity: 0,
      duration: 2,
      onComplete: () => {
        console.log("Animation complete");
      },
    });
  };

  useEffect(() => {
    animateBox();
  }, []);


  return (
    <div className={style.animation}>
      <img src={doIt} alt="Let's Do It" className={style.images} />

      <div ref={boxRef}>
        <img src={witch} className={style.images} alt="witch" />
      </div>
      
    </div>
  );
}

Animation.propTypes = {
  permanent: PropTypes.number,
  reminder: PropTypes.string,
};

export default Animation;