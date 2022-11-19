import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import pokebola from "../../resources/Elementos/elementos_pagina/pokebola.png";

const Card = ({ id, name, image, types }) => {
  return (
    <div className={styles.container}>
      <img
        src={image !== undefined ? image : pokebola}
        alt="not found"
        className={styles.image}
      />
      <h2>Name: {name.charAt(0).toUpperCase() + name.substring(1)}</h2>
      <h3>
        Types:{" "}
        {types
          .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
          .join(" - ")}
      </h3>
      <p>More info about: </p>
      <Link to={`/pokemons/${id}`} className={styles.link}>{`${
        name[0].toUpperCase() + name.substring(1)
      }`}</Link>
    </div>
  );
};

export default Card;
