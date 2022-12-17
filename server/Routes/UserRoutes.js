

import express from 'express';


import { login, register, deleteUser } from '../Controllers/UserControllers';

const router = express.Router();


router.post('/login',login);
router.post('/register',register);
router.delete('/delete/:id',deleteUser);

export default router;