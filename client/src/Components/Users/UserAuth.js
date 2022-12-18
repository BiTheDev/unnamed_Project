import React, {useState} from 'react';
import {Paper,Button,Grid,Typography,Container} from '@mui/material';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { login, register } from '../../Actions/UserAction';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', profileImage:'' };



export const UserAuth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isRegistered, setIsRegistered] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormSubmit = (e)=>{
        e.preventDefault();
        if(isRegistered){
            dispatch(login(formData,navigate));
        }else{
            dispatch(register(formData,navigate));
        }
    }

    const handleFormChanges=(e)=>{
        setFormData({...formData, [e.target.name]:e.target.value});
    }

    const handleShowPassword=()=>{
        setShowPassword((prevDisplaySetting)=>!prevDisplaySetting);
    }

    const switchFormMode = ()=>{
        setIsRegistered((setting)=>!setting);
        setShowPassword(false);
    }
    return (
        <Container component="main" maxWidth="xs">
            <Paper elevation={3}>
            <Typography variant="h5">{isRegistered ? "Register" : "Login"}</Typography>
            </Paper>
        </Container>
    )
}
