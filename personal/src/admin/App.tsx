import Login from "./Login";
import Dashboard from "./Dashboard";
import useState from "./state";
import Context from "./Context";
import "./App.scss";

export default function App() {
  const [state, admin, http] = useState();

  if (state.token) {
    return (
      <Context state={state} admin={admin} http={http}>
        <Dashboard />
      </Context>
    );
  }

  return (
    <Context state={state} admin={admin} http={http}>
      <Login />
    </Context>
  );
}
