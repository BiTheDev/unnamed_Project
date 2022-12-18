import axios from 'axios';

// const API = axios.create({baseURL:'http://localhost:5050'});


// API.interceptors.request.use((req)=>{
//     if(localStorage.getItem('profile')){
//         req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// })

// const userAPI = '/users/'


export const login = (formData) => axios.post('http://localhost:5050/users/login',formData);

export const register = (formData) => axios.post('http://localhost:5050/users/register',formData);

export const deleteUser = (id) => axios.delete(`http://localhost:5050/users/delete${id}`);