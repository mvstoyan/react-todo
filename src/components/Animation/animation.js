import React from "react";
import { gsap } from "gsap";
import witch from "../../public/img/witch.svg";
import doIt from "../../public/img/doIt.png";
import style from "./animation.module.css";
import { useState } from "react";
import { data } from "./data";
import PropTypes from "prop-types";

const { useEffect, useRef } = React;

function Animation() {
  const boxRef = useRef();

  useEffect(() => {
    console.log("start");
    gsap.from(boxRef.current, {
      x: -400,
      delay: 1,
      ease: "power2.inOut",
      opacity: 0,
      duration: 2,
      onComplete: () => {
        console.log("end");
      },
    });
  });

  const [permanent, setPermanent] = useState(0);
  const { toDoData, time } = data[permanent];

  const backPermanent = () => {
    setPermanent((permanent) => {
      permanent--;
      if (permanent < 0) {
        return data.length - 1;
      }
      return permanent;
    });
  };

  const nextPermanent = () => {
    setPermanent((permanent) => {
      permanent++;
      if (permanent > data.length - 1) {
        permanent = 0;
      }
      return permanent;
    });
  };

  return (
    <div className={style.note}>
      <img src={doIt} alt="Let's Do It" className={style.images} />

      <div ref={boxRef}>
        <img src={witch} className={style.images} alt="witch" />
      </div>
      <div className={style.two}>
        <h2>
          {toDoData} - {time}
        </h2>
        <div className={style.container}>
          <button className={style.btn} onClick={backPermanent}>
            Back
          </button>
          <button className={style.btn} onClick={nextPermanent}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

Animation.propTypes = {
  permanent: PropTypes.number,
  toDoData: PropTypes.string,
  time: PropTypes.string,
};

export default Animation;
