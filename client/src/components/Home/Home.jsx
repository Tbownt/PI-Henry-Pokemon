import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemons } from "../../redux/actions/actions";
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import Pagination from "../Pagination/Pagination";
import styles from "./Home.module.css";
const Home = () => {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  const [page, setPage] = useState(1);
  const showPerPage = 12;
  const lastOnPage = page * showPerPage;
  const firstOnPage = lastOnPage - showPerPage;
  const shownPokemons = pokemons.slice(firstOnPage, lastOnPage);

  const paginate = (pageNumber) => {
    setPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getAllPokemons());
  }, [dispatch]);

  return (
    <div className={styles.container}>
      {pokemons.length > 0 ? (
        shownPokemons.map((poke) => {
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
      ) : (
        <Loading />
      )}
      {shownPokemons.length > 0 ? (
        <div className="">
          <Pagination
            showPerPage={showPerPage}
            pokemons={pokemons.length}
            paginate={paginate}
            page={page}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Home;
