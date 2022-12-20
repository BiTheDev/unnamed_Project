

import express from 'express';


import { login, register, deleteUser,getUserInfo,updateUser } from '../Controllers/UserControllers.js';

const router = express.Router();


router.post('/login',login);
router.post('/register',register);
router.delete('/delete/:id',deleteUser);
router.get('/detail/:id',getUserInfo);
router.put('/update/:id',updateUser);

export default router;