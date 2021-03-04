import React from "react";
import { useGrants } from "App/Context";
import parse from "./parse";

import style from "./index.module.scss";

export function Show({ fields }: SProp) {
  return (
    <div className={style._}>
      <fieldset>
        <legend>General Information</legend>
        <div className={style.two}>
          {fields.map((field, index) => {
            return (
              <div key={index}>
                <div className={style.two}>
                  <div>
                    <label>
                      <strong>{field[0]}</strong>
                    </label>
                  </div>
                  <div>
                    <p>{field[1]}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export default function () {
  const [state, action] = useGrants();

  const { detail } = state;

  try {
    const fields = parse(detail as any);
    return <Show fields={fields} />;
  } catch (error) {
    console.log(detail);
    console.log(error);

    const message = error.message || "unknown error";

    action.notify(`fail parse detail: ${message}`);
    return null;
  }
}

/**
 * Typings
 */
interface SProp {
  fields: string[][];
}
