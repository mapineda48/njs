import Router, { Redirect } from "Router";
import lazy from "Lazy";

import Agape from "./Agape";
import Shop from "./Shop";

const App = Router();

App.use("/cms", Agape);
App.use("/shop", Shop);
App.use("*", () => <Redirect to="/shop" />);

export default App;
