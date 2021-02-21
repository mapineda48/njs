import React from "react";
import image from "image";
import Person from "../Person";
import Modal from "../Modal";
import useState from "./state";

import style from "./index.module.scss";

export default function () {
  const [state, landing] = useState();

  return (
    <>
      <Modal onClick={() => landing.message("")}>{state.message}</Modal>
      <div className={style._}>
        <div>
          <img src={image.logo} alt="" />
        </div>

        <div className={style.title}>
          <h1>Prueba de Desarrollo Sigma</h1>
        </div>

        <div className={style.text}>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vero vel
            sed reiciendis officia, illo atque numquam alias non dolore incidunt
            excepturi consequuntur aut omnis assumenda nesciunt. Quis nulla
            omnis neque.
          </p>
        </div>

        <div className={style.main}>
          <div>
            <img width={400} height={400} src={image.extra} alt="" />
          </div>

          <div>
            <Person
              readOnly={state.loading}
              allFields
              onSend={landing.insert}
            />
          </div>
        </div>
      </div>
    </>
  );
}
