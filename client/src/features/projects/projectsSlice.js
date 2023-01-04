import { createSlice } from "@reduxjs/toolkit";

const projectsSlice = createSlice({
  name: "projects",
  initialState: { projects: [] },
  reducers: {
    setProjects: (state, action) => {
      const user = JSON.parse(localStorage.getItem("profile"));
      if (user) {
        state.projects = action.payload.filter(
          (project) => project.author === user.result._id
        );
      }
    },
  },
});

export const { setProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
