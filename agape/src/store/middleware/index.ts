import { applyMiddleware } from "redux";
import thunk from "./thunk";
import multiple from "./multiple";

export default applyMiddleware(thunk);
