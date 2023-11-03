import Router, { Redirect } from "Router";

// import Agape from "./Agape";
// import Shop from "./Shop";

const App = Router();

App.lazy("/cms", () => import("./Agape"));
App.lazy("/shop", () => import("./Shop"));
App.use("*", () => <Redirect to="/shop" />);

export default App;
