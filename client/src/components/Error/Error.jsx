import React from "react";
import { Link } from "react-router-dom";
import charizard from "../../resources/Elementos/elementos_pagina/ChariSAD.png";
import styles from "./Error.module.css";
const Route = () => {
  return (
    <div className={styles.app}>
      <p className={styles.parrafo}>
        There's no entry for that item on the Pokedex
      </p>
      <img src={charizard} alt="img not found" className={styles.image} />
      <Link to="/Home" className={styles.link}>
        🡆 Return to home 🡄
      </Link>
    </div>
  );
};

export default Route;
