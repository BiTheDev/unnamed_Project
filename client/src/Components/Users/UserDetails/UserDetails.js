import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import { useParams, useNavigate } from "react-router-dom";

import { getUserDetail } from "../../../Actions/UserAction";

import { Container, Grid, Paper, Typography } from "@mui/material";

export const UserDetails = () => {
  const user = JSON.parse(localStorage.getItem("profile"));

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

  return (
    <Container maxWidth="xl">
      <Paper elevation={6} variant="outlined">
        <Grid container spacing={2}>
          <Grid xs={6} md={8}>
            <Typography variant="h3">
              Hello {userDetail.firstName} {userDetail.lastName}
            </Typography>
          </Grid>
          <Grid xs={6} md={8}>
            <Typography>Your Profile details</Typography>
          </Grid>
          <Grid xs={6} md={8}>
            <Typography>Your Profile details</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
