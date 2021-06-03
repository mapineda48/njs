import Overlay from "../Overlay";
import Button from "../Button";

import style from "./index.module.scss";

export default function Confirm(props: Props) {
  const { message, onClick, title, error } = props;

  if (!message) return null;

  return (
    <Overlay onOutSideClick={onClick}>
      <div className={`panel ${style._}`}>
        <h1>{title || error ? "Ups..." : "Aviso"}</h1>
        <p>{message}</p>
        <Button autoFocus red={error} green={!error} onClick={onClick}>
          Aceptar
        </Button>
      </div>
    </Overlay>
  );
}

/**
 * Types
 */
export interface Props {
  title?: string;
  error?: boolean;
  message: string;
  onClick: () => void;
}
