import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonTypes } from "../../redux/actions/actions";
import { Link } from "react-router-dom";
import create from "../../resources/Elementos/elementos_pagina/muestra/4.png";
import logo from "../../resources/Elementos/elementos_pagina/pokebola.png";
import styles from "./CreateForm.module.css";
const CreateForm = () => {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  // const [error, setError] = useState({});
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

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleType1 = (e) => {
    setInput({
      ...input,
      type1: e.target.value,
    });
  };
  const handleType2 = (e) => {
    setInput({
      ...input,
      type2: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <Link to={"/home"} className={styles.image}>
        <img src={logo} alt="not found" />
      </Link>
      <form className={styles.containerForm}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" onChange={(e) => handleChange(e)} />
        <label htmlFor="hp">HP</label>
        <input type="number" name="hp" min="0" max="99" />
        <label htmlFor="attack">Attack</label>
        <input type="number" name="attack" min="0" max="99" />
        <label htmlFor="defense">Defense</label>
        <input type="number" name="defense" min="0" max="99" />
        <label htmlFor="height">Height</label>
        <input type="number" name="height" min="0" max="99" />
        <label htmlFor="weight">Weight</label>
        <input type="number" name="weight" min="0" max="99" />
        <label>
          Select your first
          <br /> type for your Pokemon
        </label>
        <select onChange={(e) => handleType1(e)}>
          <option hidden>Type 1</option>
          {types &&
            types.map((type) => {
              return (
                <option key={type.id} value={type.name}>
                  {type.name.charAt(0).toUpperCase() + type.name.substring(1)}
                </option>
              );
            })}
        </select>
        <label>
          Select your second <br />
          type for your Pokemon
        </label>
        <select onChange={(e) => handleType2(e)}>
          <option hidden>Type2</option>
          {types &&
            types
              .filter((inp) => inp.name !== input.type1)
              .map((t) => {
                return (
                  <option key={t.id} value={t.name}>
                    {t.name.charAt(0).toUpperCase() + t.name.substring(1)}
                  </option>
                );
              })}
        </select>
        <label>Image</label>
        <input type="file" name="image" placeholder="select" />
      </form>
      <button type="submit">
        <img src={create} alt="create" className={styles.btn} />
      </button>
    </div>
  );
};

export default CreateForm;
