import React from "react";
import { Link } from "react-router-dom";
import boton from "../../resources/Elementos/elementos_landing/Boton.png";
import logo from "../../resources/Elementos/elementos_landing/Logo2.png";
import styles from "./Landing.module.css";
const Landing = () => {
  return (
    <div className={styles.app}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <p className={styles.font}>Welcome to my Individual Project</p>
      <p className={styles.font}>Gotta catch'em all!</p>
      <Link to={"/home"}>
        <img src={boton} alt="boton" className={styles.image} />
      </Link>
    </div>
  );
};

export default Landing;
