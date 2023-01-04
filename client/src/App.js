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
import SettingsHome from "./components/SettingsHome/SettingsHome";
import Project from "./components/Project/Project";

const PrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return user ? <Outlet /> : <Navigate to="/auth" />;
};

const App = () => {
  return (
    // this makes it so that the hamburger menu for the drawer on mobile appears above the page content
    // that way the page content is centered
    <Box sx={{ display: { sm: "flex", xs: "" } }}>
      <BrowserRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/tickets" element={<TicketsHome />} />
            <Route path="/projects" element={<ProjectsHome />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/settings" element={<SettingsHome />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
