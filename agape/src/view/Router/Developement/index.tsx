import React from "react";
import { Context } from "../";

import { router } from "component/Router/state";

import style from "./index.module.scss";

const change = {
  normal: () => router.end(router.create({ current: "DEVELOPEMENT" })),
  in: () => router.create({ current: "DEVELOPEMENT" }),
  out: () =>
    router.go(
      router.end(
        router.create({
          current: "DEVELOPEMENT",
          disabled: { types: ["HIDDEN"] },
        })
      ),
      { type: "HIDDEN" }
    ),
};

export default (props: Props) => {
  const [state, setState] = React.useState<keyof typeof change>("normal");

  return (
    <div className={style._}>
      <div className={style.buttons}>
        <button onClick={() => setState("in")}>in</button>
        <button onClick={() => setState("normal")}>normal</button>
        <button onClick={() => setState("out")}>out</button>
      </div>
      <Context.Provider
        value={{
          selector: change[state],
          actionEnd: (args: any) => {
            return console.log("router developement end animation");
          },
          disabledBody: false,
        }}
      >
        {props.children}
      </Context.Provider>
    </div>
  );
};

/**
 * Typings
 */

type Create = typeof router.create;

interface Props {
  children: React.ReactNode;
}
