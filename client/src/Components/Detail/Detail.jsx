import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getGameDetails } from "../../Redux/actions";
import { Loading } from "../Loading/Loading";
import { NavLink } from "react-router-dom";
import "./Detail.css";

const Detail = () => {
  const [loading, setLoading] = useState(true);
  let detail = useSelector((state) => state.gameDetails);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getGameDetails(id));
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const detailCard = (detail) => {
    const gamePlatform = detail.platforms?.map(
      (platform) => platform.platform?.name
    );

    const gameGenres = detail.genres?.map((genre) => genre.name);

    return (
      <div className="detailCard">
        <div className="img">
          <img src={detail.background_image} alt={detail.name} />
        </div>
        <div className="info">
          <div className="left">
            <h2>{detail.name}</h2>
            <div className="spliter" />
            <h4 className="subtitle">GENEROS :</h4>
            {gameGenres?.map((genre, index) => (
              <h4 key={index}>{genre}</h4>
            ))}
            <div className="spliter" />
            <h4 className="subtitle">PLATAFORMAS :</h4>
            {gamePlatform?.map((platform) => (
              <h4 key={platform}>{platform}</h4>
            ))}
            <div className="spliter" />
            <h4 className="subtitle">RATING :</h4>
            <h4>{detail.rating}</h4>
            <div className="spliter" />
            <h4 className="subtitle">LANZAMIENTO :</h4>
            <h4>{detail.released}</h4>
          </div>
          <div className="rigth">
            <h4 className="subtitle">DESCRIPCIÓN :</h4>
            <p>{detail.description.replace(/(<([^>]+)>)/gi, "")}</p>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <section>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square" style={{ "--i": "0" }}></div>
          <div className="square" style={{ "--i": "1" }}></div>
          <div className="square" style={{ "--i": "2" }}></div>
          <div className="square" style={{ "--i": "3" }}></div>
          <div className="square" style={{ "--i": "4" }}></div>
          <div className="container">
            <div className="volver">
              <NavLink to={"/home"}>
                <button>Volver</button>
              </NavLink>
            </div>
            {loading ? <Loading /> : detailCard(detail)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Detail;
