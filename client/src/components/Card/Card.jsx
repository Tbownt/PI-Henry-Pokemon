import React from "react";
import styles from "./Card.module.css";
import { Link } from "react-router-dom";
import pokebola from "../../resources/Elementos/elementos_pagina/pokebola.png";

const Card = ({ id, name, image, types }) => {
  return (
    <div className={styles.container}>
      {image ? (
        <img src={image} alt="not found" className={styles.image} />
      ) : (
        <img src={pokebola} alt="created in db" className={styles.image} />
      )}
      <div className={styles.name}>
        <Link to={`/pokemons/${id}`}>
          <h2 className={styles.name}>{name.toUpperCase()}</h2>
        </Link>
      </div>
      <div className={styles.types}>
        <h3>
          {types
            .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
            .join(" - ")}
        </h3>
      </div>
      <div className={styles.advise}>
        <h3>INFO</h3>
      </div>
    </div>
  );
};

export default Card;
