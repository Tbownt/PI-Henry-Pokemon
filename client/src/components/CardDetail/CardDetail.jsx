import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPokemonById, resetState } from "../../redux/actions/actions";
import pokebola from "../../resources/Elementos/elementos_pagina/pokebola.png";
import styles from "./CardDetail.module.css";
// import Loading from "../Loading/Loading";

import normal from "../../resources/iconos/1normal.png";
import fighting from "../../resources/iconos/2fighting.png";
import flying from "../../resources/iconos/3flying.png";
import poison from "../../resources/iconos/4poison.png";
import ground from "../../resources/iconos/5ground.png";
import rock from "../../resources/iconos/6rock.png";
import bug from "../../resources/iconos/7bug.png";
import ghost from "../../resources/iconos/8ghost.png";
import steel from "../../resources/iconos/9steel.png";
import fire from "../../resources/iconos/10fire.png";
import water from "../../resources/iconos/11water.png";
import grass from "../../resources/iconos/12grass.png";
import electric from "../../resources/iconos/13electric.png";
import psychic from "../../resources/iconos/14psychic.png";
import ice from "../../resources/iconos/15ice.png";
import dragon from "../../resources/iconos/16dragon.png";
import dark from "../../resources/iconos/17dark.png";
import fairy from "../../resources/iconos/18fairy.png";
import unknown from "../../resources/iconos/19unknown.png";
import shadow from "../../resources/iconos/20_shadow.png";

const CardDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);

  const reset = () => {
    dispatch(resetState());
  };

  useEffect(() => {
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  return (
    <div className={styles.container}>
      {pokemon.name && pokemon.types ? (
        <div className={styles.pokedex}>
          <div className={styles.name}>
            <h2>{pokemon.name.toUpperCase()}</h2>
          </div>
          <div className={styles.containerIcon1}>
            <p>{pokemon.types[0] ? pokemon.types[0].toUpperCase() : null}</p>
            <img
              src={
                pokemon.types[0] === "bug"
                  ? bug
                  : pokemon.types[0] === "dark"
                  ? dark
                  : pokemon.types[0] === "dragon"
                  ? dragon
                  : pokemon.types[0] === "electric"
                  ? electric
                  : pokemon.types[0] === "fairy"
                  ? fairy
                  : pokemon.types[0] === "fighting"
                  ? fighting
                  : pokemon.types[0] === "fire"
                  ? fire
                  : pokemon.types[0] === "flying"
                  ? flying
                  : pokemon.types[0] === "ghost"
                  ? ghost
                  : pokemon.types[0] === "grass"
                  ? grass
                  : pokemon.types[0] === "ground"
                  ? ground
                  : pokemon.types[0] === "ice"
                  ? ice
                  : pokemon.types[0] === "normal"
                  ? normal
                  : pokemon.types[0] === "poison"
                  ? poison
                  : pokemon.types[0] === "psychic"
                  ? psychic
                  : pokemon.types[0] === "rock"
                  ? rock
                  : pokemon.types[0] === "steel"
                  ? steel
                  : pokemon.types[0] === "water"
                  ? water
                  : pokemon.types[0] === "unknown"
                  ? unknown
                  : pokemon.types[0] === "shadow"
                  ? shadow
                  : null
              }
              alt="not found"
              className={styles.icon}
            />
          </div>
          <div className={styles.containerIcon2}>
            <p>{pokemon.types[1] ? pokemon.types[1].toUpperCase() : null}</p>
            <img
              src={
                pokemon.types[1] === "bug"
                  ? bug
                  : pokemon.types[1] === "dark"
                  ? dark
                  : pokemon.types[1] === "dragon"
                  ? dragon
                  : pokemon.types[1] === "electric"
                  ? electric
                  : pokemon.types[1] === "fairy"
                  ? fairy
                  : pokemon.types[1] === "fighting"
                  ? fighting
                  : pokemon.types[1] === "fire"
                  ? fire
                  : pokemon.types[1] === "flying"
                  ? flying
                  : pokemon.types[1] === "ghost"
                  ? ghost
                  : pokemon.types[1] === "grass"
                  ? grass
                  : pokemon.types[1] === "ground"
                  ? ground
                  : pokemon.types[1] === "ice"
                  ? ice
                  : pokemon.types[1] === "normal"
                  ? normal
                  : pokemon.types[1] === "poison"
                  ? poison
                  : pokemon.types[1] === "psychic"
                  ? psychic
                  : pokemon.types[1] === "rock"
                  ? rock
                  : pokemon.types[1] === "steel"
                  ? steel
                  : pokemon.types[1] === "water"
                  ? water
                  : pokemon.types[1] === "unknown"
                  ? unknown
                  : pokemon.types[1] === "shadow"
                  ? shadow
                  : null
              }
              alt="not found"
              className={styles.icon}
              hidden={pokemon.types.length < 2 ? true : false}
            />
          </div>
          <div className={styles.textLeft}>
            <span>HP: {pokemon.hp}</span>
            <span>ATTACK: {pokemon.attack}</span>
            <span>DEFENSE: {pokemon.defense}</span>
          </div>
          <div className={styles.textRight}>
            <span>SPEED: {pokemon.speed}</span>
            <span>HEIGHT: {pokemon.height}</span>
            <span>WEIGHT: {pokemon.weight}</span>
          </div>
          <div className={styles.imageContainer}>
            <img
              src={pokemon.image ? pokemon.image : pokebola}
              alt="img not found"
              className={styles.image}
            />
          </div>
        </div>
      ) : (
        <p className={styles.notFound}>Not found</p>
      )}
      <Link to={"/home"} onClick={() => reset()} className={styles.link}>
        Back to Home
      </Link>
    </div>
  );
};

export default CardDetail;
