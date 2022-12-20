import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { useParams, useNavigate } from "react-router-dom";

import {
  getUserDetail,
  updateUser,
  deleteUser,
} from "../../../Actions/UserAction";

import FileBase from "react-file-base64";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import Input from "../Input.js";


import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import "./style.css";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
  profileImage: "",
};

export const UserDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [EditFormOpened, setEditFormOpened] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const userDetail = useSelector((state) => state.UserReducer.userDetail || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserDetail(id));
  }, [id]);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user]);

  const handleEditFormDisplay = () => {
    setEditFormOpened((prevSetting) => !prevSetting);
  };

  const handleUpdateFormSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateUser(userDetail._id, formData, navigate));
  };

  const handleInputChange = (e) => {
    console.log(formData);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => {
    setShowPassword((prevDisplaySetting) => !prevDisplaySetting);
  };

  const deleteAndLogout =() =>{
    
    dispatch(deleteUser(userDetail._id))
  }

  return (
    <Paper variant="outlined">
      <Container maxWidth="xl" className="container">
        <Grid container spacing={2}>
          <Grid>
            <Typography variant="h3">
              Hello {userDetail.firstName} {userDetail.lastName}
            </Typography>
          </Grid>
          <Grid>
            <Typography>Your email is {userDetail.email}</Typography>
          </Grid>
        </Grid>
      </Container>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleEditFormDisplay}
      >
        Edit Info
      </Button>
      <Button
        color="error"
        variant="contained"
        onClick={deleteAndLogout}
      >
       Delete
      </Button>
      {EditFormOpened && (
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "30ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleUpdateFormSubmit}
        >
          <Input
            name="firstName"
            label="First Name"
            handleChange={handleInputChange}
            autoFocus
            half
            defaultValue={userDetail.firstName}
          />
          <Input
            name="lastName"
            label="Last Name"
            handleChange={handleInputChange}
            half
            defaultValue={userDetail.lastName}
          />
          <Input
            name="email"
            label="Email"
            handleChange={handleInputChange}
            half
            defaultValue={userDetail.email}
          />
          <Input
            name="oldPassword"
            label="Old Password"
            handleChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          <Input
            name="newPassword"
            label="New Password"
            handleChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            handleChange={handleInputChange}
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
          />
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setFormData({ ...formData, profileImage: base64 })
              }
            />
          </div>
          <Button type="submit" variant="contained" color="success">
            Update
          </Button>
        </Box>
      )}
    </Paper>
  );
};
