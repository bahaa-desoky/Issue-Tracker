import React from "react";
import "./styles.css";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../../actions/tickets.js";

const Form = () => {
  const [ticketData, setTicketData] = useState({
    author: "",
    title: "",
    description: "",
    priority: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // this prevents browser refresh
    dispatch(createTicket(ticketData));
  };

  const marginTop = 1;
  return (
    <Paper className="form">
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        style={{ display: "grid" }}
      >
        <Typography variant="h6">Create a new ticket</Typography>
        {/* author field, todo: make it only ever the logged in user */}
        <Box
          sx={{
            marginTop: marginTop,
          }}
        >
          <TextField
            name="author"
            variant="outlined"
            label="Author"
            fullWidth
            value={ticketData.author}
            onChange={(e) =>
              setTicketData({ ...ticketData, author: e.target.value })
            } // ...ticketData lets the other fields persist
          />
        </Box>
        {/* title field */}
        <Box
          sx={{
            marginTop: marginTop,
          }}
        >
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={ticketData.title}
            onChange={(e) =>
              setTicketData({ ...ticketData, title: e.target.value })
            }
          />
        </Box>
        {/* description field */}
        <Box
          sx={{
            marginTop: marginTop,
          }}
        >
          <TextField
            multiline
            rows={4}
            className="description-box"
            name="description"
            variant="outlined"
            label="Description"
            fullWidth
            value={ticketData.description}
            onChange={(e) =>
              setTicketData({ ...ticketData, description: e.target.value })
            }
          />
        </Box>
        {/* priority selector */}
        <Box
          sx={{
            marginTop: marginTop,
          }}
        >
          <TextField
            className="priority-select"
            value={ticketData.priority}
            onChange={(e) =>
              setTicketData({ ...ticketData, priority: e.target.value })
            }
            select // tell TextField to render select
            label="Priority"
          >
            <MenuItem value={1}>High</MenuItem>
            <MenuItem value={2}>Medium</MenuItem>
            <MenuItem value={3}>Low</MenuItem>
          </TextField>
        </Box>
        <Box
          sx={{
            marginTop: marginTop,
          }}
        >
          <Button variant="contained" type="submit" className="submit-btn">
            Create
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Form;
