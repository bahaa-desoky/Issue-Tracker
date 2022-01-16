import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify(action.data)); // we store the login data in the local storage
      return { ...state, authData: action.data };
    default:
      return state;
  }
};

export default authReducer;
