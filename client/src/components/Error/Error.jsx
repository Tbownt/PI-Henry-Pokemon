import React from "react";
import { Link } from "react-router-dom";
import charizard from "../../resources/Elementos/elementos_pagina/ChariSAD.png";
import styles from "./Error.module.css";
const Route = () => {
  return (
    <div className={styles.container}>
      <div className={styles.fondo}>
        <p className={styles.texto}>ERROR 404</p>
        <img src={charizard} alt="img not found" className={styles.image} />
        <Link to="/Home" className={styles.link}>
          🡆 Return to home 🡄
        </Link>
      </div>
    </div>
  );
};

export default Route;
