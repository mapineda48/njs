import { Outlet, useRelative } from "Router";

export default function Menu() {
  const { changeTo, outletTo } = useRelative();

  return (
    <div>
      <button
        onClick={() => {
          outletTo("home");
        }}
      >
        home
      </button>
      <button
        onClick={() => {
          outletTo("setting");
        }}
      >
        setting
      </button>
      <button
        onClick={() => {
          changeTo("login");
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
