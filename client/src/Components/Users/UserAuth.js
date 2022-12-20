import React, { useEffect, useState } from "react";
import { Paper, Button, Grid, Typography, Container, Avatar } from "@mui/material";
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
  const user = JSON.parse(localStorage.getItem('profile'));
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
      dispatch(register(formData, navigate));
    } else {
      dispatch(login(formData, navigate));
    }
  };

  const handleChange = (e) => {
    console.log(formData);
    setFormData({...formData, [e.target.name]:e.target.value})
  };

  const handleShowPassword = () => {
    setShowPassword((prevDisplaySetting) => !prevDisplaySetting);
  };

  const switchFormMode = () => {
    setIsRegistered((setting) => !setting);
    setShowPassword(false);
  };
  
  useEffect(()=>{
    if(user){
      navigate('/');
    }
  },[user])
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
              <div className={classes.fileInput}>
                <FileBase type="file" multiple={false} onDone={({base64}) => setFormData({...formData, profileImage:base64})}/>
              </div>
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
