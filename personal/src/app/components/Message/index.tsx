import clsx from "clsx";
import { isURL } from "./util";

import style from "./index.module.scss";

export default function Message(props: Props) {
  const className = clsx([
    style.root,
    props.right && style.right,
    !props.right && style.left,
  ]);

  const Content = !isURL(props.children) ? (
    <p>{props.children}</p>
  ) : (
    <a href={props.children} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );

  return (
    <div className={className}>
      <div>{Content}</div>
    </div>
  );
}

/**
 * Types
 */
interface Props {
  right?: boolean;
  children: string;
}
