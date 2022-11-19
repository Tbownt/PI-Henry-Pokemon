import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemonTypes,
  createPokemon,
  getAllPokemons,
} from "../../redux/actions/actions";
import { Link, useHistory } from "react-router-dom";
// import create from "../../resources/Elementos/elementos_pagina/muestra/4.png";
import logo from "../../resources/Elementos/elementos_pagina/pokebola.png";
import styles from "./CreateForm.module.css";

const CreateForm = () => {
  //Estados
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
  const [error, setError] = useState({});

  //Manejo de estados
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);
  const history = useHistory();

  //Efectos
  useEffect(() => {
    dispatch(getPokemonTypes());
    dispatch(getAllPokemons());
  }, [dispatch]);

  //Variables

  let symbols = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
  let decimals = /^\d*\.\d+$/;
  let accents = /^[a-zA-Z]+$/;
  //Funciones controladoras
  function formValidate(input) {
    let error = {};
    if (!input.name.trim() || input.name.length < 3) {
      error.name = "Name require at least 3 Letters";
    } else if (!symbols.test(input.name.trim())) {
      error.name = "Name only can be Letters";
    } else if (!accents.test(input.name)) {
      error.name = "Name must not have any Accents";
    }
    if (decimals.test(input.hp)) {
      error.name = "Health Points may not have a decimal number";
    }
    if (decimals.test(input.attack)) {
      error.name = "Attack may not have decimal numbers";
    }
    if (decimals.test(input.defense)) {
      error.name = "Defense may not have decimal numbers";
    }
    if (decimals.test(input.height)) {
      error.name = "Height may not have decimal numbers";
    }
    if (decimals.test(input.weight)) {
      error.name = "Weight may not have decimal numbers";
    }
    return error;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });

    setError(
      formValidate({
        ...input,
        [name]: value,
      })
    );
  };

  const handleType1 = (e) => {
    const { value } = e.target;
    setInput({
      ...input,
      type1: value,
    });
  };

  const handleType2 = (e) => {
    const { value } = e.target;
    setInput({
      ...input,
      type2: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error.name) {
      dispatch(createPokemon(input));
      setInput({});
      alert("Your Pokemon has been created!");
      history.push("/home");
    } else if (error.name) {
      alert("Name is required");
      setInput({});
    }
  };

  return (
    <div className={styles.container}>
      <label hidden={!error.name ? true : false} className={styles.danger}>
        {error.name}
      </label>
      <Link to={"/home"} className={styles.image}>
        <img src={logo} alt="not found" />
      </Link>
      <h1>CREATE YOUR OWN POKEMON</h1>
      <form className={styles.containerForm} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => handleChange(e)}
          value={input.name}
          placeholder="Name"
        />
        <label htmlFor="hp">HP</label>
        <input
          type="number"
          name="hp"
          min="0"
          max="99"
          onChange={(e) => handleChange(e)}
          value={input.hp}
        />
        <label htmlFor="attack">Attack</label>
        <input
          type="number"
          name="attack"
          min="0"
          max="99"
          onChange={(e) => handleChange(e)}
          value={input.attack}
        />
        <label htmlFor="defense">Defense</label>
        <input
          type="number"
          name="defense"
          min="0"
          max="99"
          onChange={(e) => handleChange(e)}
          value={input.defense}
        />
        <label htmlFor="height">Height</label>
        <input
          type="number"
          name="height"
          min="0"
          max="99"
          onChange={(e) => handleChange(e)}
          value={input.height}
        />
        <label htmlFor="weight">Weight</label>
        <input
          type="number"
          name="weight"
          min="0"
          max="99"
          onChange={(e) => handleChange(e)}
          value={input.weight}
        />
        <label htmlFor="speed">Speed</label>
        <input
          type="number"
          name="speed"
          min="0"
          max="99"
          onChange={(e) => handleChange(e)}
          value={input.speed}
        />
        <label>Select your first type for your Pokemon</label>
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
        <label>Select your second type for your Pokemon</label>
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
        <input type="text" name="image" placeholder="Paste your URL!" />
        <button
          className={styles.btn}
          type="submit"
          disabled={input.name.length < 3 ? true : false}
          // hidden={!input.name ? true : false}
        >
          <span>Create</span>
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
