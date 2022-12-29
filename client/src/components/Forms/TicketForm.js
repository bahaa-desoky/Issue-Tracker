import React from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTicket, updateTicket } from "../../actions/tickets.js";
import ClearIcon from "@mui/icons-material/Clear";

const TicketForm = ({ currentId, setCurrentId }) => {
  // this is just so that the author (current user) shows up in the table.
  // not needed for now, but will be helpful once collaboration is implemented
  const user = JSON.parse(localStorage.getItem("profile"));
  const [checked, setChecked] = useState(false);
  const [ticketData, setTicketData] = useState({
    name: user ? user.result.name : "",
    project: "",
    title: "",
    description: "",
    priority: "",
    resolved: false,
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
      setTicketData({ ...ticketData, resolved: false });
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
        style={{ display: "grid", padding: "1vh" }}
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
            <Grid container alignContent="center" direction="row" spacing={1}>
              <Grid item sx={{ width: "100%" }}>
                <TextField
                  sx={{ width: "50%" }}
                  required
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
              {currentId && (
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={() => {
                          setChecked(!checked);
                          setTicketData({
                            ...ticketData,
                            resolved: !ticketData.resolved,
                          });
                        }}
                      />
                    }
                    label="Mark Resolved?"
                  />
                </Grid>
              )}
            </Grid>
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

export default TicketForm;
