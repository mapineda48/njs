export default function Message(props: Props) {
  return (
    <div className="notification-message">
      <div>
        <h2>Aviso</h2>
        <p>{props.message}</p>
      </div>
    </div>
  );
}

/**
 * Types
 */
interface Props {
  message: string;
}
