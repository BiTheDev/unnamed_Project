import axios from 'axios';

const API = axios.create({baseURL:'http://localhost:5050'});

const userAPI = '/users/'


export const login = (formData) => API.post(userAPI+ 'login',formData);

export const register = (formData) => API.post(userAPI+'register',formData);

export const deleteUser = (id) => API.delete(userAPI+`delete${id}`);