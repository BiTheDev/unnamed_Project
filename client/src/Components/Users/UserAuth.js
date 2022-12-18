import React, { useState } from "react";
import { Paper, Button, Grid, Typography, Container } from "@mui/material";
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, register } from "../../Actions/UserAction";
import style from "./style";
import Input from "./Input";

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  profileImage: '',
};

export const UserAuth = () => {
  const classes = style();
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    if (isRegistered) {
        console.log(formData);
      dispatch(register(formData, navigate));
    } else {
        console.log(formData);
      dispatch(login(formData, navigate));
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]:e.target.value})
    console.log(formData);
  };

  const handleShowPassword = () => {
    setShowPassword((prevDisplaySetting) => !prevDisplaySetting);
  };

  const switchFormMode = () => {
    setIsRegistered((setting) => !setting);
    setShowPassword(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h5">
          {isRegistered ? "Register" : "Login"}
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            {isRegistered && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isRegistered && (
            <>
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
              <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onChange={({base64}) => setFormData({...FormData, profileImage:base64})}/>
                </div>

              </>
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isRegistered ? "Register" : "Login"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchFormMode}>
                {isRegistered
                  ? "Already have an account? Sign In"
                  : "Don't have and account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};
