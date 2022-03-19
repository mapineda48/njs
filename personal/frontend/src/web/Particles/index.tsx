import React from "react";
import style from "./index.module.scss";
require("particles.js");

/**
 * https://vincentgarreau.com/particles.js/
 */


const load = (window as any).particlesJS.load;

export default function Particles(props: Props) {
  React.useEffect(() => {
    load(props.id, "/particlesjs-config.json");
  }, [props.id]);

  return (
    <div className={style._} id={props.id}>
      <canvas
        className="particles-js-canvas-el"
        width={900}
        height={500}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

/**
 * Types
 */
interface Props {
  id: string;
}
