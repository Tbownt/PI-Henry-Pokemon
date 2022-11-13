import React from "react";
import s from "./Loading.module.css";
const Loading = () => {
  return (
    <div className={s.pokeball}>
      <p className={s.loading}>Loading...</p>
    </div>
  );
};

export default Loading;
