import React from "react";
import "./styles.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import TicketsHome from "./components/TicketsHome/TicketsHome";
import Auth from "./components/Auth/Auth";
import Sidebar from "./components/Sidebar/Sidebar";
import { Box } from "@mui/material";
import ProjectsHome from "./components/ProjectsHome/ProjectsHome";

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

const App = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/tickets" element={<TicketsHome />} />
            <Route path="/projects" element={<ProjectsHome />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
