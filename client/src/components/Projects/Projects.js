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
  TablePagination,
  TableSortLabel,
  Typography,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteProject } from "../../actions/projects.js";

const createRow = (_id, date, title, description, name) => {
  return { _id, date, title, description, name };
};

const getTableData = (data) => {
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
        element.title,
        element.description,
        element.name
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
        <TableCell align="left">{row.name}</TableCell>
        <TableCell>
          {/* through props drilling, we set the current id of the project to be edited */}
          <IconButton onClick={() => setCurrentId(row._id)}>
            <EditIcon
              fontSize="small"
              color={currentId === row._id ? "primary" : "red"}
            />
          </IconButton>
        </TableCell>
        <TableCell>
          <IconButton onClick={() => dispatch(deleteProject(row._id))}>
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
                Project Description
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

const Projects = ({ currentId, setCurrentId }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const projects = useSelector((state) => state.projects); // from reducers

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return !projects.length ? (
    <Typography variant="h5">
      No projects yet, add one to get started.
    </Typography>
  ) : (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="project-table">
          <colgroup>
            <col style={{ width: "1%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "40%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "1%" }} />
            <col style={{ width: "1%" }} />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Date</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Author</TableCell>
              {/* since edit and delete columns only have an icon they can be narrow */}
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {getTableData(projects)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                <Row
                  key={row._id}
                  row={row}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default Projects;
