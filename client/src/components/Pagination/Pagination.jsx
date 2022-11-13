import React from "react";
import styles from "./Pagination.module.css";
const Pagination = ({ showPerPage, pokemons, paginate, page }) => {
  const pageNumber = [];
  const total = Math.ceil(pokemons / showPerPage);
  for (let i = 1; i <= total; i++) {
    pageNumber.push(i);
  }

  return (
    <div className={styles.paginate}>
      <button
        className={styles.btn}
        onClick={page > 1 ? () => paginate(page - 1) : null}
        hidden={page === 1 ? true : false}
      >
        Prev
      </button>
      {pageNumber.length > 0 &&
        pageNumber.map((number) => {
          return (
            <button
              className={styles.btn}
              key={number}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          );
        })}
      <button
        className={styles.btn}
        onClick={page < 4 ? () => paginate(page + 1) : null}
        hidden={page === 4 ? true : false}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
