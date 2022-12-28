import React from "react";
import "./styles.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import Sidebar from "./components/Sidebar/Sidebar";
import { Box } from "@mui/material";

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
            <Route path="/tickets" element={<Home />} />
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
};

export default App;
