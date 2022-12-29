import { combineReducers } from "redux";
import auth from "./auth.js";
import tickets from "./tickets.js";
import projects from "./tickets.js";

export default combineReducers({
  projects,
  tickets,
  auth,
});
