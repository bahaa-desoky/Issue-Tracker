import React from "react";
import { TextField, Typography, Paper, Grid, IconButton } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useAddProjectMutation,
  useUpdateProjectMutation,
} from "../../features/projects/projectsApiSlice.js";
import ClearIcon from "@mui/icons-material/Clear";

const ProjectForm = ({ currentId, setCurrentId }) => {
  // this is just so that the author (current user) shows up in the table.
  // not needed for now, but will be helpful once collaboration is implemented
  const user = JSON.parse(localStorage.getItem("profile"));
  const [projectData, setProjectData] = useState({
    name: user ? user.result.name : "",
    title: "",
    description: "",
  });
  const [addProject, { isLoading: addLoading }] = useAddProjectMutation();
  const [updateProject, { isLoading: updateLoading }] =
    useUpdateProjectMutation();
  const project = useSelector((state) => {
    return currentId
      ? state.projects.projects.find((project) => project._id == currentId)
      : null;
  });

  useEffect(() => {
    // if we have a project that exists and should be edited, then set the form data fields to that project's info
    // we monitor when this is true by putting the project in the dependency list
    if (project) setProjectData(project);
  }, [project]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      await updateProject(projectData);
      setProjectData(projectData);
    } else {
      await addProject(projectData);
      clear();
    }
  };

  const clear = () => {
    setCurrentId(null);
    setProjectData({
      ...projectData,
      title: "",
      description: "",
    });
  };

  return (
    <Paper>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{ display: "grid", padding: "1vh" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">
              {currentId ? "Edit an existing" : "Create a new"} project
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name="title"
              variant="outlined"
              label="Project name"
              fullWidth
              value={projectData.title}
              onChange={(e) =>
                setProjectData({ ...projectData, title: e.target.value })
              } // ...projectData lets the other fields persist
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              multiline
              rows={4}
              className="description-box"
              name="description"
              variant="outlined"
              label="Description"
              fullWidth
              value={projectData.description}
              onChange={(e) =>
                setProjectData({ ...projectData, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={1}>
              <Grid item>
                <LoadingButton
                  loading={currentId ? updateLoading : addLoading}
                  variant="contained"
                  type="submit"
                  className="submit-btn"
                >
                  {currentId ? "Update" : "Create"}
                </LoadingButton>
              </Grid>
              <Grid item>
                <IconButton onClick={() => clear()}>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProjectForm;
