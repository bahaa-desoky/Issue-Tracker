import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import Tickets from "../Tickets/Tickets";
import TicketForm from "../Forms/TicketForm.js";
import { useGetProjectsQuery } from "../../features/projects/projectsApiSlice";
import { setProjects } from "../../features/projects/projectsSlice.js";
import { useGetTicketsQuery } from "../../features/tickets/ticketsApiSlice";
import { setTicketsState } from "../../features/tickets/ticketsSlice";

const Project = () => {
  const { id } = useParams();
  const [currentId, setCurrentId] = useState(null);
  const { data: fetchedProjects } = useGetProjectsQuery();
  const { data: fetchedTickets } = useGetTicketsQuery();
  const dispatch = useDispatch();
  // get the selected project
  const project = useSelector((state) => {
    return state.projects.projects.find((proj) => proj._id === id);
  });

  // fetchedProjects gets all projects, we then dispatch setProjects to filter based on the current user
  useEffect(() => {
    if (fetchedProjects) {
      dispatch(setProjects(fetchedProjects));
    }
  }, [fetchedProjects]);

  // fetchedTickets gets all tickets, we then dispatch setTickets to filter based on the current user
  useEffect(() => {
    if (fetchedTickets) {
      dispatch(setTicketsState(fetchedTickets));
    }
  }, [fetchedTickets]);

  return !project ? (
    <></>
  ) : (
    <Box sx={{ margin: "auto", width: "80vw" }}>
      <Typography variant="h4">{project.title}</Typography>
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <Tickets
              projectId={id}
              canEdit={true}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <TicketForm
              projectId={id}
              projectName={project.title}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Project;
