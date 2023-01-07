import React from "react";
import {
  TextField,
  Typography,
  Paper,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  useAddTicketMutation,
  useUpdateTicketMutation,
} from "../../features/tickets/ticketsApiSlice";
import ClearIcon from "@mui/icons-material/Clear";

// projectId and projectName are needed for the ticket model, but they are fixed for each ticket
const TicketForm = ({ projectId, projectName, currentId, setCurrentId }) => {
  // this is just so that the author (current user) shows up in the table.
  // not needed for now, but will be helpful once collaboration is implemented
  const user = JSON.parse(localStorage.getItem("profile"));
  const [checked, setChecked] = useState(false);
  const [ticketData, setTicketData] = useState({
    name: user ? user.result.name : "",
    projectId: projectId,
    project: projectName,
    title: "",
    description: "",
    priority: "",
    resolved: false,
  });
  const [addTicket, { isLoading: addLoading }] = useAddTicketMutation();
  const [updateTicket, { isLoading: updateLoading }] =
    useUpdateTicketMutation();
  const [error, setError] = useState("");
  const ticket = useSelector((state) => {
    return currentId
      ? state.tickets.tickets.find((ticket) => ticket._id == currentId)
      : null;
  });

  useEffect(() => {
    // if we have a ticket that exists and should be edited, then set the form data fields to that ticket's info
    // we monitor when this is true by putting the ticket in the dependency list
    if (ticket) setTicketData(ticket);
  }, [ticket]);

  const handleSubmit = async (e) => {
    e.preventDefault(); // this prevents browser refresh
    try {
      if (currentId) {
        await updateTicket(ticketData);
        setTicketData(ticketData);
      } else {
        await addTicket(ticketData);
        clear();
      }
    } catch (e) {
      setError(e.data.message);
    }
  };

  const clear = () => {
    setCurrentId(null);
    setTicketData({
      ...ticketData,
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
            <Typography variant="subtitle1" color="red">
              {error && `Error: ${error}`}
            </Typography>
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
              } // ...ticketData lets the other fields persist
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
                <LoadingButton
                  loading={currentId ? updateLoading : addLoading}
                  variant="contained"
                  type="submit"
                  className="submit-btn"
                >
                  {currentId ? "Update" : "Create"}
                </LoadingButton>
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
