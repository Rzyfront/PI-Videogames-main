import React from "react";

const Card = ({ key, name, image, genres }) => {
  return (
    <div className="card" key={key}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      {genres.map((genre) => {
        return <p>genre</p>;
      })}
    </div>
  );
};

export default Card;
