import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { usePortalBody } from "../Portals";
import Button from "../Button";

import style from "./index.module.scss";

export function Confirm(props: Props) {
  const { message, onConfirm, onCancel, onFinally, title, error } = props;

  if (error) console.error(error);

  const isError = Boolean(error);

  const confirm =
    onConfirm || onFinally
      ? () => {
          if (onConfirm) onConfirm();
          if (onFinally) onFinally();
        }
      : undefined;

  const cancel = onCancel
    ? () => {
        onCancel();
        if (onFinally) onFinally();
      }
    : undefined;

  let msg = "unknown";

  if (!error && message) {
    msg = message;
  } else if (error) {
    if (error?.response?.data?.message) {
      msg = error.response.data.message;
    } else if (error.message) {
      msg = error.message;
    }
  }

  // const messageToShow =
  //   _message.length > 15 ? _message.substring(0, 10) + "..." : _message;

  return (
    <div className="overlay" style={props.style}>
      <div className={`panel ${style._}`}>
        <h1>{error ? "Ups..." : title || "Aviso"}</h1>
        <p title={msg}>{msg}</p>
        <div className={style.btns}>
          {cancel && (
            <Button red onClick={cancel}>
              <FaTimes />
            </Button>
          )}
          <Button autoFocus red={isError} green={!isError} onClick={confirm}>
            <FaCheck />
          </Button>
        </div>
      </div>
    </div>
  );
}

export function useConfirm() {
  const portal = usePortalBody();

  const push = React.useMemo(() => {
    return (pipe: Omit<Props, "style">) => {
      portal((props) => {
        return (
          <Confirm
            {...pipe}
            style={props.style}
            onFinally={() => {
              props.remove();
              if (pipe.onFinally) pipe.onFinally();
            }}
          />
        );
      });
    };
  }, [portal]);

  return push;
}

/**
 * Types
 */
export interface Props {
  style?: React.CSSProperties;
  title?: string;
  error?: any;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onFinally?: () => void;
}
