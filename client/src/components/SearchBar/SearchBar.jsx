import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByName } from "../../redux/actions/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  let history = useHistory();
  const allPokemons = useSelector((state) => state.pokemons);

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let match = allPokemons.find(
      (p) =>
        p.name.trim().toLocaleLowerCase() === name.trim().toLocaleLowerCase()
    );
    if (match) {
      dispatch(getPokemonByName(match.name));
      history.push(`/pokemons/${match.name}`);
      setName("");
    } else {
      alert("There's no Pokemons with that Name. Try again");
      setName("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={handleInputChange}
        placeholder="Search for a Pokemon..."
        onClick={() => setName("")}
      />
    </form>
  );
};

export default SearchBar;
