import React from "react";
import Ticket from "./Ticket/Ticket";
import { useSelector } from "react-redux";
import {
  CircularProgress,
  Paper,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CircleSharpIcon from "@mui/icons-material/CircleSharp";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const createRow = (id, date, title, author, priority, status, comments) => {
  return { id, date, title, author, priority, status, comments };
};

const getTableData = (data) => {
  var rows = [];
  data.forEach((element) => {
    var date = new Date(element.createdAt);
    rows.push(
      createRow(
        element._id,
        date.toISOString().split("T")[0],
        element.project + ": " + element.title,
        element.author,
        element.priority == "1"
          ? "High"
          : element.priority == "2"
          ? "Medium"
          : "Low",
        element.resolved == false ? "Ongoing" : "Resolved",
        element.comments
      )
    );
  });
  return rows;
};

const handleTicketPress = (ticket) => {
  console.log(ticket);
};

const Tickets = () => {
  // from reducers
  const tickets = useSelector((state) => state.tickets);
  return !tickets.length ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="ticket-table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Project: Issue</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getTableData(tickets).map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
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
              {/* status: resolved, ongoing */}
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
              <TableCell align="right">
                <IconButton onClick={handleTicketPress(row)}>
                  <ArrowForwardIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tickets;
