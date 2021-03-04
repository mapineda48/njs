import React from "react";
import style from "./index.module.scss";

/**
 * https://codepen.io/kingfisher13/pen/vKXwNN
 */

export default function () {
  return (
    <div className={style._}>
      <div className={style.loader}>
        <div className={style.loaderWheel}></div>
        <div className={style.loaderText}></div>
      </div>
    </div>
  );
}
