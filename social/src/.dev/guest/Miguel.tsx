import Draggable from "react-draggable";
import React from "react";
import Portal from "../../components/Portal";
import type { Miguel as Mock } from "./io";

export default function Miguel({ mock }: Props) {
  const [state, setState] = React.useState("");

  return (
    <Portal>
      <Draggable>
        <form
          onSubmit={(e) => {
            e.preventDefault();

            if (!state) return;

            mock.addMessage(state);
            setState("");
          }}
        >
          <input
            type="text"
            value={state}
            onChange={({ currentTarget: { value } }) => setState(value)}
          />
          <button type="submit">enviar</button>
          <button onClick={mock.toggleOnline}>toggle</button>
        </form>
      </Draggable>
    </Portal>
  );
}

/**
 * Types
 */
interface Props {
  mock: Mock;
}
