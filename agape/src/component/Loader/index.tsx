import React from "react";

import style from "./index.module.scss";

/**
 * taken from
 * https://codepen.io/inOcean/pen/MWwoGOX
 */
export const Preloader = (prop: Prop) => {
  const { words } = prop;
  return (
    <div className={style.loader}>
      <div className={style.particles}>
        <hr />
        <hr />
        <hr />
        <hr />
      </div>
      {words ? <div className={style.words}>{words}</div> : null}
    </div>
  );
};

export default Preloader;

/**
 * Typings
 */
interface Prop {
  words?: string;
}
