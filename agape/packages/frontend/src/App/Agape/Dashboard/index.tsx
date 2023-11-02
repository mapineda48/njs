import Router, { Redirect } from "Router";
import Menu from "./Menu";
import Home from "./Home";
import Inventory from "./Inventory/index";
import Custormer from "./Customer";
import Setting from "./Setting";

const Dashboard = Router(Menu);

Dashboard.use("/home", Home);
Dashboard.use("/inventory", Inventory);
Dashboard.use("/customer", Custormer);
Dashboard.use("/setting", Setting);
Dashboard.use("*", () => <Redirect relative to="/home" />);

export default Dashboard;
