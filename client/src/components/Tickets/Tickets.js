import { React, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
  IconButton,
} from "@mui/material";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteTicket } from "../../actions/tickets.js";

const createRow = (
  _id,
  date,
  title,
  description,
  author,
  priority,
  status,
  comments
) => {
  return { _id, date, title, description, author, priority, status, comments };
};

const getTableData = (data) => {
  var rows = [];
  data.forEach((element) => {
    var date = new Date(element.createdAt);
    date = date.toISOString().split("T")[0];
    rows.push(
      createRow(
        element._id,
        date,
        element.project + ": " + element.title,
        element.description,
        element.author,
        element.priority == "1"
          ? "High"
          : element.priority == "2"
          ? "Medium"
          : "Low",
        element.resolved == false ? "Ongoing" : "Resolved",
        element.comments // to be used at a later time
      )
    );
  });
  return rows;
};

function Row({ row, currentId, setCurrentId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell align="left">{row.title}</TableCell>
        <TableCell align="left">{row.author}</TableCell>
        <TableCell align="left">
          <CircleSharpIcon
            sx={{
              marginRight: "0.5em",
              fontSize: "0.7em",
              color:
                row.priority == "High"
                  ? "red"
                  : row.priority == "Medium"
                  ? "#FFE200"
                  : "#A7F432",
            }}
          ></CircleSharpIcon>
          {row.priority}
        </TableCell>
        <TableCell align="left">
          <CircleSharpIcon
            sx={{
              marginRight: "0.5em",
              fontSize: "0.7em",
              color: row.status == "Resolved" ? "#03AC13" : "blue",
            }}
          ></CircleSharpIcon>
          {row.status}
        </TableCell>
        <TableCell>
          {/* through props drilling, we set the current id of the ticket to be edited */}
          <IconButton onClick={() => setCurrentId(row._id)}>
            <EditIcon
              fontSize="small"
              color={currentId == row._id ? "primary" : "red"}
            />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => dispatch(deleteTicket(row._id))}>
            <DeleteIcon fontSize="small" />
          </IconButton>
        </TableCell>
      </TableRow>
      {/* collapsible description  */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Issue Description
              </Typography>
              <Typography variant="h7">{row.description}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const Tickets = ({ currentId, setCurrentId }) => {
  // from reducers
  const tickets = useSelector((state) => state.tickets);

  return !tickets.length ? (
    <Typography variant="h5">
      No tickets yet. Please add a ticket to get started.
    </Typography>
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="ticket-table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Date</TableCell>
            <TableCell>Project: Issue</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            {/* since edit and delete columns only have an icon they can be narrow */}
            <TableCell sx={{ width: "1%" }} />
            <TableCell sx={{ width: "1%" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {getTableData(tickets).map((row) => (
            <Row
              key={row._id}
              row={row}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tickets;
