import React from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Box,
  Grid,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicket, updateTicket } from "../../actions/tickets.js";
import ClearIcon from "@mui/icons-material/Clear";

const Form = ({ currentId, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [ticketData, setTicketData] = useState({
    name: user ? user.result.name : "",
    project: "",
    title: "",
    description: "",
    priority: "",
  });
  const dispatch = useDispatch();

  const ticket = useSelector((state) => {
    return currentId
      ? state.tickets.find((ticket) => ticket._id == currentId)
      : null;
  });

  useEffect(() => {
    // if we have a ticket that exists and should be edited, then set the form data fields to that ticket's info
    // we monitor when this is true by putting the ticket in the dependency list
    if (ticket) setTicketData(ticket);
  }, [ticket]);

  const handleSubmit = (e) => {
    e.preventDefault(); // this prevents browser refresh
    if (currentId) {
      dispatch(updateTicket(currentId, ticketData));
    } else {
      dispatch(createTicket(ticketData));
    }
  };

  const clear = () => {
    setCurrentId(null);
    setTicketData({
      project: "",
      title: "",
      description: "",
      priority: "",
    });
  };

  return (
    <Paper>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        style={{ display: "grid", padding: "2%" }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <Typography variant="h6">
              {currentId ? "Edit an existing" : "Create a new"} ticket
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name="project"
              variant="outlined"
              label="Project name"
              fullWidth
              value={ticketData.project}
              onChange={(e) =>
                setTicketData({ ...ticketData, project: e.target.value })
              } // ...ticketData lets the other fields persist
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              name="title"
              variant="outlined"
              label="Title"
              fullWidth
              value={ticketData.title}
              onChange={(e) =>
                setTicketData({ ...ticketData, title: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              required
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
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              sx={{ width: "40%" }}
              required
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
          </Grid>
          <Grid item xs={12} sm={12}>
            <Grid container spacing={1}>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  className="submit-btn"
                >
                  {currentId ? "Update" : "Create"}
                </Button>
              </Grid>
              <Grid item>
                <IconButton onClick={() => clear()}>
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default Form;
