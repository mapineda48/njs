import Router, { Redirect } from "Router";
import Agape from "./CMS";
import Shop from "./Shop";

const App = Router();

App.use("/cms", Agape);
App.use("/shop", Shop);
App.use("*", () => <Redirect to="/shop" />);
App.root();

export default App;
