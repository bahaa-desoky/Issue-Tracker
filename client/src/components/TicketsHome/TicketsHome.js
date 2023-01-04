import React from "react";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import Tickets from "../Tickets/Tickets.js";

const TicketsHome = () => {
  const [currentId, setCurrentId] = useState(null);

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
