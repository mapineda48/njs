import React from "react";
import { BiHelpCircle } from "react-icons/bi";
import useGrants from "./state";
import Context from "./Context";
import Content from "./Content";
import Tool from "./Tool";
import disclaimer from "./disclaimer";

import style from "./index.module.scss";

export default function () {
  const grants = useGrants();

  const [state, action] = grants;

  return (
    <Context.Provider value={grants}>
      <div className={style.app}>
        <div className={style.main}>
          <div className={style.header}>
            {state.help && (
              <div
                className={style.help}
                title="Help"
                onClick={() => action.notify(disclaimer)}
              >
                <BiHelpCircle />
              </div>
            )}
            <h1>Grants</h1>
          </div>
          <div className={style.content}>
            <Content />
          </div>
          <div className={style.footer}>
            <Tool />
          </div>
        </div>
      </div>
    </Context.Provider>
  );
}
