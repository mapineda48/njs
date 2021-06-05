import React from "react";
import Overlay from "components/Overlay";
import { useState } from "../state/Context";
import style from "./index.module.scss";

export function Modals(props: Props) {
  const { Components, remove } = props;

  return (
    <>
      {Components.map((Modal, index) => (
        <Overlay key={index} style={{ zIndex: 1000 + index }}>
          <div className={style._}>
            <Modal close={() => remove(index)} />
          </div>
        </Overlay>
      ))}
    </>
  );
}

export default function ModalsInContext() {
  const [state, admin] = useState();

  return <Modals Components={state.Modals} remove={admin.modal.remove} />;
}

/**
 * Types
 */
interface Props {
  Components: Modal[];
  remove: (index: number) => void;
}

export type Modal = (props: PropsModal) => JSX.Element;

interface PropsModal {
  close: () => void;
}
