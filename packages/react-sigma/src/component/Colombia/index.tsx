import React from "react";
import Modal from "../Modal";
import useState from "./state";
import type { Colombia } from "shared";

const value: any = null;

const Context = React.createContext<Colombia>(value);

export function useColombia() {
  return React.useContext(Context);
}


export default function (props: Props) {
  const [state, colombia] = useState();

  if (state.current) {
    return (
      <Context.Provider value={state.current}>
        {props.children}
      </Context.Provider>
    );
  }

  if (state.message) {
    return (
      <Modal title="Error" onClick={() => colombia.message("")}>
        {state.message}
      </Modal>
    );
  }

  colombia.fetch();

  return <div>Cargando Colombia...</div>;
}

/**
 * Types
 */

interface Props {
  children: React.ReactNode;
}
