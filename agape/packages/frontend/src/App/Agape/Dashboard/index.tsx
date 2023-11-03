import Router, { Redirect } from "Router";
import Menu from "./Menu";
// import Home from "./Home";
// import Inventory from "./Inventory/index";
// import Custormer from "./Customer";
// import Setting from "./Setting";

const Dashboard = Router(Menu);

Dashboard.lazy("/home", () => import("./Home"));
Dashboard.lazy("/inventory", () => import("./Inventory/index"));
Dashboard.lazy("/customer", () => import("./Customer"));
Dashboard.lazy("/setting", () => import("./Customer"));
Dashboard.use("*", () => <Redirect relative to="/home" />);

export default Dashboard;
