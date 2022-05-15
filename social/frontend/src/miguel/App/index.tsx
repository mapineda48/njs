import Session from "./Session";
import Dashboard from "./Dashboard";
import Store from "./Store";
import { Sync } from "./Sync";
import "bootstrap";
import "./index.scss";

export default function App() {
  return (
    <Session>
      <Store>
        <Sync>
          <Dashboard />
        </Sync>
      </Store>
    </Session>
  );
}
