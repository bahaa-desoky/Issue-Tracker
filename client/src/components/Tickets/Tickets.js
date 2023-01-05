import { React, useEffect, useState } from "react";
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
  TablePagination,
  TableSortLabel,
  Typography,
  IconButton,
  Skeleton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useGetTicketsQuery,
  useDeleteTicketMutation,
} from "../../features/tickets/ticketsApiSlice";
import { setTicketsState } from "../../features/tickets/ticketsSlice";
import { useGetProjectsQuery } from "../../features/projects/projectsApiSlice";

const createRow = (
  _id,
  date,
  title,
  description,
  name,
  priority,
  status,
  comments
) => {
  return { _id, date, title, description, name, priority, status, comments };
};

const getTableData = (data, projectData, canEdit) => {
  var rows = [];
  data.forEach((element) => {
    var timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var intlObj = new Intl.DateTimeFormat("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      timeZone: timezone,
    });

    var date = new Date(element.createdAt);
    date = intlObj.format(date);
    rows.push(
      createRow(
        element._id,
        date,
        canEdit
          ? element.title
          : projectData.find((project) => project._id === element?.projectId)
              ?.title +
              ": " +
              element.title,
        element.description,
        element.name,
        element.priority === "1"
          ? "High"
          : element.priority === "2"
          ? "Medium"
          : "Low",
        element.resolved === false ? "Ongoing" : "Resolved",
        element.comments // to be used at a later time
      )
    );
  });
  return rows;
};

function Row({ row, canEdit, currentId, setCurrentId }) {
  const [open, setOpen] = useState(false);
  const [deleteTicket] = useDeleteTicketMutation();

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
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">
          <Typography variant="h7">{row.priority}</Typography>
        </TableCell>
        <TableCell align="left">
          <Typography variant="h7">{row.status}</Typography>
        </TableCell>
        {canEdit && (
          <>
            <TableCell>
              {/* through props drilling, we set the current id of the ticket to be edited */}
              <IconButton onClick={() => setCurrentId(row._id)}>
                <EditIcon
                  fontSize="small"
                  color={currentId === row._id ? "primary" : "red"}
                />
              </IconButton>
            </TableCell>
            <TableCell>
              <IconButton onClick={async () => await deleteTicket(row._id)}>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </TableCell>
          </>
        )}
      </TableRow>
      {/* collapsible description  */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Issue Description
              </Typography>
              <Typography
                variant="h7"
                paragraph
                style={{ wordBreak: "break-word" }}
              >
                {row.description}
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// canEdit is used so that the edit and delete buttons do not appear in the "All tickets" page.
// However, projectId is only used when canEdit is used so perhaps canEdit can be remvoed in the future
const Tickets = ({ projectId, canEdit, currentId, setCurrentId }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const {
    data: fetchedTickets,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTicketsQuery();
  // We need projects fetched so we can read the project name to display it in the "All tickets" table.
  // Adding/editing/removing tickets is not possible on the "All tickets" page so we only need to read the data
  const { data: fetchedProjects } = useGetProjectsQuery();
  const dispatch = useDispatch();
  const tickets = useSelector((state) => {
    if (projectId) {
      // get the selected project's tickets
      return state.tickets.tickets.filter(
        (ticket) => ticket.projectId === projectId
      );
    } else {
      return state.tickets.tickets;
    }
  });

  // fetchedTickets gets all tickets, we then dispatch setTickets to filter based on the current user
  useEffect(() => {
    if (fetchedTickets) {
      dispatch(setTicketsState(fetchedTickets));
    }
  }, [fetchedTickets]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let content;
  if (isLoading) {
    content = <Skeleton variant="rectangular" width={"100%"} height={"30vh"} />;
  } else if (isError) {
    content = <Typography variant="h5">{error}</Typography>;
  } else if (isSuccess) {
    content = !fetchedProjects ? (
      <></>
    ) : !tickets.length ? (
      <Typography variant="h5">
        {canEdit
          ? "No tickets yet, add one to get started."
          : "No tickets yet, create a project to get started."}
      </Typography>
    ) : (
      <TableContainer component={Paper}>
        <Table aria-label="ticket-table">
          <colgroup>
            <col style={{ width: "1%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            {canEdit && (
              <>
                <col style={{ width: "1%" }} />
                <col style={{ width: "1%" }} />
              </>
            )}
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell>{canEdit ? "Issue" : "Project: Issue"}</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
              {/* since edit and delete columns only have an icon they can be narrow */}
              {canEdit && (
                <>
                  <TableCell />
                  <TableCell />
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {getTableData(tickets, fetchedProjects, canEdit)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row
                  key={row._id}
                  row={row}
                  canEdit={canEdit}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={tickets.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    );
  }

  return content;
};

export default Tickets;
