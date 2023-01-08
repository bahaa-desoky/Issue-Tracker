import React from "react";
import { useState } from "react";
import { Grid, Box, Typography } from "@mui/material";
import Projects from "../Projects/Projects.js";
import ProjectForm from "../Forms/ProjectForm.js";

const ProjectsHome = () => {
  const [currentId, setCurrentId] = useState(null);

  return (
    <Box sx={{ margin: "auto", width: "90vw" }}>
      <Typography variant="h4">All Projects</Typography>
      <Grid container alignItems="stretch" spacing={3}>
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
