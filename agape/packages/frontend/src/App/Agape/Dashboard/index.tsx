import Router, { Redirect } from "Router";
import Menu from "./Menu";
import Setting from "./Setting";
import Home from "./Home";

const Dashboard = Router(Menu);

Dashboard.use("/home", Home);
Dashboard.use("/setting", Setting);
Dashboard.use("*", () => <Redirect relative to="/home" />);

export default Dashboard;
