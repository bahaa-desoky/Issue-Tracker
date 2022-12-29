import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import { getTickets } from "../../actions/tickets.js";
import Tickets from "../Tickets/Tickets.js";

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
        }}
      >
        <Tickets
          canEdit={false}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
      </Box>
    </Box>
  );
};

export default TicketsHome;
