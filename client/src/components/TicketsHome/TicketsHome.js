import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Grid, Box, Paper, Typography } from "@mui/material";
import { getTickets } from "../../actions/tickets.js";
import Tickets from "../Tickets/Tickets.js";
import TicketForm from "../Forms/TicketForm.js";

const TicketsHome = () => {
  const [currentId, setCurrentId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  return (
    <Box sx={{ margin: "auto", width: "80vw" }}>
      <Typography variant="h4">All Tickets</Typography>
      <Box
        sx={{
          marginTop: 2,
          width: { sm: "75vw", xs: "85vw" },
        }}
      >
        <Tickets currentId={currentId} setCurrentId={setCurrentId} />
      </Box>
    </Box>
  );
};

export default TicketsHome;
