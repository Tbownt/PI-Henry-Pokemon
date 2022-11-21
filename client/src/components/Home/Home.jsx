import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons, getPokemonTypes } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";
import NavBar from "../NavBar/NavBar";
const Home = () => {
  //Estados
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);
  const types = useSelector((state) => state.types);

  //Paginado
  const [page, setPage] = useState(1);
  const showPerPage = 12;
  const lastOnPage = page * showPerPage;
  const firstOnPage = lastOnPage - showPerPage;
  const shownPokemons = pokemons.slice(firstOnPage, lastOnPage);

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  //efectos
  useEffect(() => {
    dispatch(getAllPokemons());
    dispatch(getPokemonTypes());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {pokemons.length > 0 && (
        <div className={styles.containerNav}>
          <NavBar setPage={setPage} types={types} showPerPage={showPerPage} />
        </div>
      )}
      {shownPokemons.length > 0 ? (
        <div className={styles.containerPagination}>
          <Pagination
            showPerPage={showPerPage}
            pokemons={pokemons.length}
            paginate={paginate}
            page={page}
          />
        </div>
      ) : null}
      {!pokemons.length > 0 && <Loading />}
      <div className={styles.cardContainer}>
        {pokemons.length > 0
          ? shownPokemons.map((poke) => {
              return (
                <Card
                  key={poke.id}
                  id={poke.id}
                  name={poke.name}
                  types={poke.types}
                  image={poke.image}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Home;
