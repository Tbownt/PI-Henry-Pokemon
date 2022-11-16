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
import { Link, useHistory } from "react-router-dom";

const NavBar = ({ setPage, types }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const pokemons = useSelector((state) => state.pokemons);

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
      <SearchBar />
      <label htmlFor="orderName">Order</label>
      <select onChange={(e) => handleName(e)} name="orderName">
        <option value="asc">Order by A to Z</option>
        <option value="desc">Order by Z to A</option>
      </select>
      <label htmlFor="orderAttack">Order by Attack</label>
      <select onChange={(e) => handleAttack(e)} name="orderAttack">
        <option hidden>Order by</option>
        <option value="AttackAsc">Order by 🡡 Attack</option>
        <option value="AttackDesc">Order by 🡣 Attack</option>
      </select>
      <label htmlFor="types">Types</label>
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
      <label>Filters</label>
      <select onChange={(e) => handleCreated(e)}>
        <option value="" hidden>
          Filter by
        </option>
        <option value="default" onClick={() => reset()}>
          default
        </option>
        <option value="created">Created</option>
        <option value="api">API</option>
      </select>
      <button onClick={() => reset()}>↺</button>

      <Link to="/create">Create your Pokemon</Link>
    </div>
  );
};

export default NavBar;
