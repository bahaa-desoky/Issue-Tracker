import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { getTickets } from "../../actions/tickets.js";
import Tickets from "../Tickets/Tickets.js";
import Form from "../Form/Form.js";
import { DRAWERWIDTH } from "../../constants/styleConstants.js";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <Box margin="auto">
      <Typography variant="h4">All Tickets</Typography>
      <Grid width={"85vw"} container alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <Tickets currentId={currentId} setCurrentId={setCurrentId} />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
