import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonTypes } from "../../redux/actions/actions";
import logo from "../../resources/Elementos/elementos_pagina/pokebola.png";
import styles from "./CreateForm.module.css";
const CreateForm = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const [input, setInput] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    type1: "",
    type2: "",
    image: "",
  });

  useEffect(() => {
    dispatch(getPokemonTypes());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      <img src={logo} alt="not found" className={styles.image} />
      <form className={styles.containerForm}>
        <label>Name</label>
        <input type="text" name="name" />
        <label>HP</label>
        <input type="number" name="hp" min="0" max="99" />
        <label>Attack</label>
        <input type="number" name="attack" min="0" max="99" />
        <label>Defense</label>
        <input type="number" name="defense" min="0" max="99" />
        <label>Height</label>
        <input type="number" name="height" min="0" max="99" />
        <label>Weight</label>
        <input type="number" name="weight" min="0" max="99" />
        <select>
          <option hidden>Pokemon Type1</option>
          {types &&
            types.map((type) => {
              return (
                <option key={type.id} value={type.name}>
                  {type.name.charAt(0).toUpperCase() + type.name.substring(1)}
                </option>
              );
            })}
        </select>
        <label>Type2</label>
        <select>
          <option>Pokemon Type2</option>
          {}
        </select>
        <label>Image</label>
        <input type="file" name="image" />
      </form>
    </div>
  );
};

export default CreateForm;
