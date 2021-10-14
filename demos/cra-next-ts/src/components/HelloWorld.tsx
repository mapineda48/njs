import style from "./index.module.scss";

export default function HelloWorld(props: Props) {
  return <div className={style.greet}>{props.children}</div>;
}

/**
 * Types
 */
interface Props {
  children: React.ReactNode;
}
