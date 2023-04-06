import React from "react";
import videoMp4 from "../../Assets/Landing.mp4";
import videoWebm from "../../Assets/Landing.webm";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { getAllVideogames, getGenres } from "../../Redux/actions.js";
import "./Landing.css";
import { NavLink } from "react-router-dom";
import logo from "../../Assets/Nexus.svg";

const Landing = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  //Verificar si ya el H2 es visible, si si se activa la claseName que le otorga las animaciones glitch
  const [isH2Visible, setIsH2Visible] = useState(false);
  //Guarda el estado del h2 de forma no mutable
  const h2Ref = useRef(null);
  useEffect(() => {
    setShow(true);
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
    //Renderizo el video y lo pongo de fondo aplicando css
    <div className={`Landing ${show ? "scale-up-center" : ""} `}>
      <div className="logos">
        <img src={logo} alt="Nexus_Logo" width="35px" />
        <h1>NEXUS</h1>
      </div>
      <video autoPlay loop muted>
        <source src={videoMp4} type="video/mp4" />
        <source src={videoWebm} type="video/webm" />
      </video>

      {/* Agrego el titulo del lading y el botton de ingresar al website */}
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
            <p className="welcome">
              Nexus App es una biblioteca web de video juegos, busca y mira el
              detalle de tus videojuegos favoritos, ademas puedes agregar nuevos
              titulos a la biblioteca online
            </p>
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
