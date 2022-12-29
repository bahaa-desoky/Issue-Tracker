// MUI Drawer, boilerplate code from https://mui.com/material-ui/react-drawer/#responsive-drawer
import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BugReportIcon from "@mui/icons-material/BugReport";
import PestControlIcon from "@mui/icons-material/PestControl";
import SettingsIcon from "@mui/icons-material/Settings";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { COLORHASH, DRAWERWIDTH } from "../../constants/styleConstants";
import { Avatar } from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { LOGOUT } from "../../constants/actionTypes";
import decode from "jwt-decode";

const Sidebar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname.slice(1)); // to highlight selected drawer item

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  const userProfile = user ? (
    <List>
      <ListItem>
        <ListItemIcon>
          <Avatar
            sx={{
              // random color avatar each time
              bgcolor: `rgb(${COLORHASH(
                user.result._id.toString()
              ).toString()})`,
            }}
            src={user.result.imageUrl}
          >
            {user.result.name.charAt(0)}
          </Avatar>
        </ListItemIcon>
        <ListItemText primary={user.result.name} />
      </ListItem>
    </List>
  ) : (
    <div></div>
  );

  const drawer = (
    <div>
      <Toolbar>
        <PestControlIcon />
        <Typography sx={{ margin: "auto" }} variant="h6" noWrap component="div">
          Issue Tracker
        </Typography>
      </Toolbar>
      <Divider />
      {userProfile}
      <Divider />
      <List>
        {["Projects", "Tickets", "Settings"].map((text, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              selected={selected === text.toLowerCase()}
              onClick={() => {
                navigate(`/${text.toLowerCase()}`);
                setSelected(text.toLowerCase());
              }}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <AccountTreeIcon />
                ) : index === 1 ? (
                  <BugReportIcon />
                ) : (
                  <SettingsIcon />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={logout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: `${!user ? "none" : "block"}` }}>
      <Toolbar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${DRAWERWIDTH}px)` },
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Box sx={{ width: { sm: DRAWERWIDTH }, flexShrink: { sm: 0 } }}>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWERWIDTH,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: DRAWERWIDTH,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Sidebar;
