import { combineReducers } from "redux";
import { reducer as app } from "./app";
import { reducer as invoice } from "./invoice";
import { reducer as management } from "./management";

export default combineReducers({ app, invoice, management });
