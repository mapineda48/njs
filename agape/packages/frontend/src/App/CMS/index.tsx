import Router, { Redirect } from "Router";
import Menu from "./Menu";
import Setting from "./Setting";
import Home from "./Home";
import Login from "./Login";

const Agape = Router("/dashboard", Menu);

Agape.use("/home", Home);
Agape.use("/setting", Setting);
Agape.use("../login", Login)
Agape.use("*", () => <Redirect relative to="/home" />);

export default Agape;
