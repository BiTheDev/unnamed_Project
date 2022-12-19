import React, {useEffect} from 'react'

import { useDispatch, useSelector } from 'react-redux'

import moment from 'moment';

import { useParams, useNavigate } from 'react-router-dom';

import { getUserDetail } from '../../../Actions/UserAction';

import { Paper, Typography } from '@mui/material';



export const UserDetails = () => {
    const user = JSON.parse(localStorage.getItem('profile'));

    const userDetail = useSelector((state)=>state.UserReducer.userDetail);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(()=>{
        dispatch(getUserDetail(id));
    },[id]);

    useEffect(()=>{
        if(!user){
            navigate("/");
        }
    },[user]);

  return (
    <Paper elevation={6}>
        <div>
            <Typography>
                Hello
                {userDetail.firstName}
            </Typography>
        </div>

    </Paper>
  )
}
