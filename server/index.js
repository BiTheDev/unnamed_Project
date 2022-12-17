import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import { CONNECTION_URL } from './Security/tokens.js';

import userRoutes from './Routes/UserRoutes.js';

const app = express();


app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());

app.use('/users', userRoutes);


const PORT = 5050;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(()=>app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error)=>console.log(error.message));