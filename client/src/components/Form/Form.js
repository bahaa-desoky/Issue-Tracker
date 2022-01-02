import React from "react";
import "./styles.css";
import { TextField, Button, Typography, Paper, MenuItem } from "@mui/material";
import { useState } from "react";

const Form = () => {
  const [ticketData, setTicketData] = useState({
    author: "",
    title: "",
    description: "",
    priority: 2,
  });

  const handleSubmit = () => {};

  return (
    <Paper className="form">
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Typography variant="h6">Create a new Ticket</Typography>
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
        <TextField
          name="description"
          variant="outlined"
          label="Description"
          fullWidth
          value={ticketData.description}
          onChange={(e) =>
            setTicketData({ ...ticketData, description: e.target.value })
          }
        />
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
        <Button variant="contained" type="submit" className="submit-btn">
          Create
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
