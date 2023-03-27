import React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, image, genres }) => {
  return (
    <Link to={`/detail/${id}`} key={id}>
      <div className="card" key={id}>
        <div className="card-genres">
          {genres?.map((genre) => {
            return <p key={genre.name}>{genre.name}</p>;
          })}
        </div>
        <img src={image} alt={name} width="250px" height="160" />
        <h2 className="card-title">{name}</h2>
      </div>
    </Link>
  );
};

export default Card;
