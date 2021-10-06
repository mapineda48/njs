export default function Message(props: { message: string }) {
  return (
    <div className="message">
      <p>{props.message}</p>
    </div>
  );
}
