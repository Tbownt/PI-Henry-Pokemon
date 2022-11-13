import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getPokemonById, resetState } from "../../redux/actions/actions";
import Loading from "../Loading/Loading";

const CardDetail = (props) => {
  const idParams = props.match.params.id;
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);

  useEffect(() => {
    // dispatch(getAllPokemons());
    dispatch(resetState());
    dispatch(getPokemonById(idParams));
  }, [dispatch, idParams]);

  return (
    <div>
      {pokemon.name !== undefined ? (
        <div>
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substring(1)}
          </h2>
          <h3>
            Types:{" "}
            {pokemon.types
              .map((t) => t.charAt(0).toUpperCase() + t.substring(1))
              .join(" - ")}
          </h3>
          <h3>HP: {pokemon.hp}</h3>
          <h4>ATTACK: {pokemon.attack}</h4>
          <p>DEFENSE: {pokemon.defense}</p>
          <p>SPEED: {pokemon.speed}</p>
          <p>HEIGHT: {pokemon.height}</p>
          <p>WEIGHT: {pokemon.weight}</p>
          {console.log(pokemon.image)}
          <img src={pokemon.image} alt="img not found" />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default CardDetail;
