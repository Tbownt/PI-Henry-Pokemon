import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getPokemonById, resetState } from "../../redux/actions/actions";
import pokebola from "../../resources/Elementos/elementos_pagina/pokebola.png";
// import Loading from "../Loading/Loading";

const CardDetail = () => {
  // const idParams = props.match.params.id;
  const { id } = useParams();
  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);
  // const [show, setShow] = useState(false);

  const reset = () => {
    dispatch(resetState());
  };

  useEffect(() => {
    // dispatch(resetState());
    dispatch(getPokemonById(id));
  }, [dispatch, id]);

  return (
    <div>
      <Link to={"/home"} onClick={() => reset()}>
        Back to Home
      </Link>

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
          <p>DEFENSE: {pokemon.defense ? pokemon.defense : 25}</p>
          <p>SPEED: {pokemon.speed}</p>
          <p>HEIGHT: {pokemon.height}</p>
          <p>WEIGHT: {pokemon.weight}</p>
          <img
            src={pokemon.image ? pokemon.image : pokebola}
            alt="img not found"
          />
        </div>
      ) : (
        <p>Not found</p>
      )}
    </div>
  );
};

export default CardDetail;
