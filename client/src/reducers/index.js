import { combineReducers } from "redux";
import auth from "./auth.js";
import tickets from "./tickets.js";

export default combineReducers({
  tickets,
  auth,
});
