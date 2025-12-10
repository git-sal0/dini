import React from "react";
import "./cards.css";

function Card({ image,title,bgCircleColor,description,onClickButton}) {
  return (
    <div className="card-container">
      <div
        className="card"
        style={{
          "--bg-circle-color": bgCircleColor
        }}
      >
        <div className="imgBx">
          <img src={image} alt={title} />
        </div>

        <div className="contentBx">
          <h2>{title}</h2>
          <p className="description">{description}</p>
          <button className="Blue-Button" onClick={onClickButton}>
            S'inscrire
          </button>
          </div>
      </div>
    </div>
  );
}

export default Card;

