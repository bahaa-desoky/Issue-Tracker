import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes";

export default (projects = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      const user = JSON.parse(localStorage.getItem("profile"));
      return action.payload.filter((project) => {
        if (user.result._id && !user.result.googleId) {
          return project.author === user.result._id;
        } else {
          return project.author === user.result.googleId;
        }
      });
    case CREATE:
      return [...projects, action.payload];
    case UPDATE:
      // return the projects, but 'replace' the project that was updated with the payload
      return projects.map((project) =>
        project._id === action.payload._id ? action.payload : project
      );
    case DELETE:
      return projects.filter((project) => project._id !== action.payload); // the payload from actions is just the id
    default:
      return projects;
  }
};
