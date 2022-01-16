import * as React from "react";
import { useState, useEffect } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  useEffect(() => {
    const token = user ? user.token : null;
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

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
              <Button color="inherit">Logout</Button>
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
