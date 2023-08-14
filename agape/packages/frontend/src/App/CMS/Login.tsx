import { useRelative } from "Router";

export default function Login() {
  const { changeTo } = useRelative();

  return (
    <div>
      Welcome to the Login!!!
      <button
        onClick={() => {
          changeTo("dashboard");
        }}
      >
        dashboard
      </button>
    </div>
  );
}
