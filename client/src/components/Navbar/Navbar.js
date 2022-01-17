import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: LOGOUT });
    setUser(null);
    navigate("/auth");
  };

  useEffect(() => {
    const token = user ? user.token : null;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < Date.now()) logout(); // this checks if the expiry date (in milliseconds) has passed
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]); // user should be set as soon as auth is succesful, i.e. when we redirect back to home

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ borderRadius: "5px" }}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { sm: "block" },
              textDecoration: "none",
              color: "white",
            }}
          >
            Issue Tracker
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {user ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                columnGap: "1vw",
              }}
            >
              <Typography
                sx={{ display: { xs: "none", sm: "block" } }}
                variant="h6"
              >
                {user.result.name}
              </Typography>
              <Avatar src={user.result.imageUrl}>
                {user.result.name.charAt(0)}
              </Avatar>
              <Button color="inherit" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button component={Link} to="/auth" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
