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
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../../features/auth/authSlice";
import {
  useLoginMutation,
  useSignUpMutation,
} from "../../features/auth/authApiSlice";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formData, setformData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rePassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();
  const [signUp] = useSignUpMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = isSignUp
      ? await signUp(formData).unwrap()
      : await login(formData).unwrap();
    dispatch(setCredentials({ ...userData }));
    navigate("/projects");
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
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
