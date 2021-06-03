import { FaCheck, FaTimes } from "react-icons/fa";
import { GrRefresh } from "react-icons/gr";
import style from "./index.module.scss";

export default function Confirm(props: Props) {
  const title = props.title ? props.title : props.error ? "Ups..." : "Aviso";

  const [Button] = [
    props.reload && (
      <div className={style.reload}>
        <GrRefresh />
      </div>
    ),
    (props.error || !props.onCancel) && (
      <button
        autoFocus
        type="button"
        className="btn btn-success"
        onClick={props.onConfirm}
      >
        <FaCheck />
      </button>
    ),
    <>
      <button
        autoFocus
        type="button"
        className="btn btn-success"
        onClick={props.onConfirm}
      >
        <FaCheck />
      </button>
      <button type="button" className="btn btn-danger" onClick={props.onCancel}>
        <FaTimes />
      </button>
    </>,
  ].filter(Boolean);

  return (
    <div className={style._}>
      <div className={style.main}>
        <h3>{title}</h3>
        <div className={style.content}>{props.message}</div>
        <div className={style.buttons}>{Button}</div>
      </div>
    </div>
  );
}

/**
 * Types
 */

export interface Props {
  title?: string;
  error?: boolean;
  onCancel?: () => void;
  reload?: boolean;
  message: string;
  onConfirm: () => void;
}
