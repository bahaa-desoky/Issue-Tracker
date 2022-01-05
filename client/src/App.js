import React from "react";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import "./styles.css";
import Tickets from "./components/Tickets/Tickets.js";
import Form from "./components/Form/Form.js";
import { getTickets } from "./actions/tickets";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Grid, Box } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <div>
      <ResponsiveAppBar />
      <Grid container alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <Tickets />
          </Box>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            <Form />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
