import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { result, token } = action.payload;
      state.user = result._id;
      state.token = token;
      localStorage.setItem("profile", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null;
      localStorage.setItem("profile", null);
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
