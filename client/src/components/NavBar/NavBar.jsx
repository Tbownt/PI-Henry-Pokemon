import React from "react";
import {
  getAllPokemons,
  orderByAttack,
  orderByName,
  filterByCreated,
  filterByType,
} from "../../redux/actions/actions";
import styles from "./NavBar.module.css";
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
// import create from "../../resources/Elementos/elementos_pagina/muestra/4.png";
import { Link, useHistory } from "react-router-dom";

const NavBar = ({ setPage, types }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleName = (e) => {
    dispatch(orderByName(e.target.value));
    setPage(1);
    history.push("/home");
  };

  const handleAttack = (e) => {
    dispatch(orderByAttack(e.target.value));
    setPage(1);
    history.push("/home");
  };

  const handleCreated = (e) => {
    // e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setPage(1);
    history.push("/home");
  };

  const handleType = (e) => {
    dispatch(filterByType(e.target.value));
    setPage(1);
    history.push("/home");
  };

  const reset = () => {
    dispatch(getAllPokemons());
    setPage(1);
    history.push("/home");
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <SearchBar />
      </div>
      <div className={styles.order}>
        <label htmlFor="orderName" className={styles.order}>
          Order
        </label>
        <select onChange={(e) => handleName(e)} name="orderName">
          <option value="asc">ORDER BY A TO Z</option>
          <option value="desc">ORDER BY Z TO A </option>
        </select>
      </div>
      <div className={styles.attack}>
        <label htmlFor="orderAttack">ORDER BY ATTACK</label>
        <select onChange={(e) => handleAttack(e)} name="orderAttack">
          <option hidden>Order by</option>
          <option value="AttackAsc">ORDER BY 🡡 ATTACK</option>
          <option value="AttackDesc">ORDER by 🡣 ATTACK</option>
        </select>
      </div>
      <div className={styles.types}>
        <label htmlFor="types">TYPES</label>
        <select onChange={(e) => handleType(e)} name="types">
          <option value="types" hidden>
            Types
          </option>

          {types.length > 0
            ? types.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name.charAt(0).toUpperCase() + type.name.substring(1)}
                </option>
              ))
            : null}
        </select>
      </div>
      <div className={styles.filter}>
        <label>FILTERS</label>
        <select onChange={(e) => handleCreated(e)}>
          <option hidden>Filter by</option>
          <option value="created">Created</option>
          <option value="api">API</option>
        </select>
      </div>
      <button className={styles.btn} onClick={() => reset()}>
        RESET FILTERS
      </button>
      <div className={styles.containerLink}>
        <button className={styles.link} onClick={() => history.push("/create")}>
          <header>CREATE</header>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
