import React from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import { GoogleLogin } from "react-google-login";
import GoogleIcon from "./google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AUTH } from "../../constants/actionTypes";
import { signUp, signIn } from "../../actions/auth.js";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSuccess = async (response) => {
    const result = response.profileObj;
    const token = response.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/tickets");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
  };

  // used for JWT auth (sign up/in)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signUp(formData, navigate));
    } else {
      dispatch(signIn(formData, navigate));
    }
  };

  return (
    <Container sx={{ marginTop: 2 }} maxWidth="xs">
      <Paper>
        <form style={{ padding: "3%" }} onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12}>
              <Typography align="center" variant="h5">
                {isSignUp ? "Sign Up" : "Log In"}
              </Typography>
            </Grid>
            {isSignUp && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    autoFocus
                    fullWidth
                    name="first_name"
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => {
                      setformData({ ...formData, firstName: e.target.value });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => {
                      setformData({ ...formData, lastName: e.target.value });
                    }}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                name="email"
                label="Email"
                value={formData.email}
                onChange={(e) => {
                  setformData({ ...formData, email: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setformData({ ...formData, password: e.target.value });
                }}
              />
            </Grid>
            {isSignUp && (
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Retype Password"
                  type="password"
                  value={formData.rePassword}
                  onChange={(e) => {
                    setformData({ ...formData, rePassword: e.target.value });
                  }}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12}>
              <Box textAlign="center">
                <Button
                  fullWidth
                  variant="contained"
                  type="submit"
                  className="submit-btn"
                >
                  {isSignUp ? "Sign up" : "Login"}
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box textAlign="center">
                <GoogleLogin
                  clientId="726694797277-hqfefpdsg8ev5ngikhmc6q1agunej4r3.apps.googleusercontent.com"
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                  render={(renderProps) => (
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                      startIcon={<GoogleIcon />}
                    >
                      Sign in with Google
                    </Button>
                  )}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box textAlign="center">
                <Button
                  style={{ backgroundColor: "transparent" }}
                  color="inherit"
                  disableRipple
                  onClick={() => setIsSignUp((prevIsSignUp) => !prevIsSignUp)}
                >
                  {isSignUp ? "Log in" : "Sign up"} instead
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
