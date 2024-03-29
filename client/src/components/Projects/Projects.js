import { React, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { useNavigate } from "react-router-dom";
import {
  useGetProjectsQuery,
  useDeleteProjectMutation,
} from "../../features/projects/projectsApiSlice";
import { setProjects } from "../../features/projects/projectsSlice.js";

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

const Row = ({ row, currentId, setCurrentId }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [deleteProject] = useDeleteProjectMutation();

  const handleProjectClick = (id) => {
    navigate(`/projects/${id}`);
  };

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          "&:hover": { cursor: "pointer" },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          onClick={() => handleProjectClick(row._id)}
          component="th"
          scope="row"
        >
          {row.date}
        </TableCell>
        <TableCell onClick={() => handleProjectClick(row._id)} align="left">
          {row.title}
        </TableCell>
        <TableCell onClick={() => handleProjectClick(row._id)} align="left">
          {row.name}
        </TableCell>
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
          <IconButton onClick={async () => await deleteProject(row._id)}>
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
};

const Projects = ({ currentId, setCurrentId }) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const {
    data: fetchedProjects,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProjectsQuery();
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects.projects);

  // fetchedProjects gets all projects, we then dispatch setProjects to filter based on the current user
  useEffect(() => {
    if (fetchedProjects) {
      dispatch(setProjects(fetchedProjects));
    }
  }, [fetchedProjects]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  let content;
  if (isLoading) {
    // could use Skeleton loader in future
    content = <Skeleton variant="rectangular" width={"100%"} height={"30vh"} />;
  } else if (isError) {
    content = <Typography variant="h5">{error}</Typography>;
  } else if (isSuccess) {
    content = !projects.length ? (
      <Typography variant="h5">
        No projects yet, add one to get started.
      </Typography>
    ) : (
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
    );
  }

  return content;
};

export default Projects;
