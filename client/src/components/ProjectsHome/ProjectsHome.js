import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { getProjects } from "../../actions/projects.js";
import Projects from "../Projects/Projects.js";
import ProjectForm from "../Forms/ProjectForm.js";

const ProjectsHome = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  return (
    <Box sx={{ margin: "auto", width: "80vw" }}>
      <Typography variant="h4">All Projects</Typography>
      <Grid width={"80vw"} container alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <Projects currentId={currentId} setCurrentId={setCurrentId} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <ProjectForm currentId={currentId} setCurrentId={setCurrentId} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProjectsHome;
