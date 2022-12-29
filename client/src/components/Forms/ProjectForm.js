import React from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject, updateProject } from "../../actions/projects.js";
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
  const dispatch = useDispatch();

  const project = useSelector((state) => {
    return currentId
      ? state.projects.find((project) => project._id == currentId)
      : null;
  });

  useEffect(() => {
    // if we have a project that exists and should be edited, then set the form data fields to that project's info
    // we monitor when this is true by putting the project in the dependency list
    if (project) setProjectData(project);
  }, [project]);

  const handleSubmit = (e) => {
    e.preventDefault(); // this prevents browser refresh
    if (currentId) {
      dispatch(updateProject(currentId, projectData));
      setProjectData(projectData);
    } else {
      dispatch(createProject(projectData));
    }
  };

  const clear = () => {
    setCurrentId(null);
    setProjectData({
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
                <Button
                  variant="contained"
                  type="submit"
                  className="submit-btn"
                >
                  {currentId ? "Update" : "Create"}
                </Button>
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
