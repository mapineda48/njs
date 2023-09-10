import { useSession } from "App/Agape/Session";
import { Outlet, useRelative } from "Router";

export default function Menu() {
  const { user } = useSession();
  const changeTo = useRelative();

  return (
    <div>
      <span>Welcome: {user.fullName}</span>
      <button
        onClick={() => {
          changeTo("home");
        }}
      >
        home
      </button>
      <button
        onClick={() => {
          changeTo("setting");
        }}
      >
        setting
      </button>
      <button
        onClick={() => {
          
        }}
      >
        login
      </button>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
