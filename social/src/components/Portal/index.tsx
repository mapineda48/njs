import ReactDOM from "react-dom";

export default function Portal(props: Props) {
  return ReactDOM.createPortal(props.children, document.body);
}

/**
 * Types
 */
interface Props {
  children: React.ReactNode;
}
