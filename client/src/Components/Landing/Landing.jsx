import React from "react";
import videoMp4 from "../../Assets/Landing.mp4";
import videoWebm from "../../Assets/Landing.webm";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames, getGenres } from "../../Redux/actions.js";
import "./Landing.css";
import { NavLink } from "react-router-dom";

const Landing = () => {
  const dispatch = useDispatch();
  const [isH2Visible, setIsH2Visible] = useState(false);
  const h2Ref = useRef(null);
  useEffect(() => {
    const h2 = h2Ref.current;
    const position = h2.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 2;
    const isH2Visible = position < screenPosition;
    setIsH2Visible(isH2Visible);
  }, []);

  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getGenres());
  });

  return (
    <div className="Landing">
      <video autoPlay loop muted>
        <source src={videoMp4} type="video/mp4" />
        <source src={videoWebm} type="video/webm" />
      </video>

      <div className="content">
        <div className="bodyLanding">
          <div className="containerLanding">
            <h2
              ref={h2Ref}
              className={`glitch animate-h2 ${
                isH2Visible ? "animate-h2-active" : ""
              }`}
            >
              DESCUBRE LA MEJOR WEB GAMING
            </h2>
            <div className="btn">
              <NavLink to={"/home"} className="navlink">
                EMPEZAR
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
