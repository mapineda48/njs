import Router, { Redirect } from "Router";
import Session from "./Session";
import Dashboard from "./Dashboard";

const Agape = Router(Session);

Agape.use("/dashboard", Dashboard);
Agape.use("*", () => <Redirect relative to="/dashboard" />);

export default Agape;
