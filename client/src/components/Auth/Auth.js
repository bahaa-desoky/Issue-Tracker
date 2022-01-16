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

const Auth = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const googleSuccess = async (response) => {
    const result = response.profileObj;
    const token = response.tokenId;

    try {
      dispatch({ type: AUTH, data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
  };

  const handleSubmit = () => {};

  return (
    <Container sx={{ marginTop: 2 }} maxWidth="xs">
      <Paper>
        <form style={{ padding: "3%" }} onSubmit={() => handleSubmit()}>
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
                    onChange={() => {}}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="last_name"
                    label="Last Name"
                    onChange={() => {}}
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
                onChange={() => {}}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                onChange={() => {}}
              />
            </Grid>
            {isSignUp && (
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  name="repassword"
                  label="Retype Password"
                  onChange={() => {}}
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
                  clientId="726694797277-86isk51bmng63ug9v2j2pk18a548a06m.apps.googleusercontent.com"
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
