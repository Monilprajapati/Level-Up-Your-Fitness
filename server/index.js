import express, { urlencoded } from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT } from './src/config/serverConfig.js';
import connnectionOfDB from './src/config/databaseConfig.js'
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./src/routes/auth.route.js";
import profileRoute from "./src/routes/profile.route.js";
import cookieParser from 'cookie-parser';

await connnectionOfDB();

app.use(bodyParser.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL || "*", //we can give specific domain , that only take accept the request from that specific domain
        methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
        credentials: true, //for get header details like cookie...
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(`/api/v1/auth`, authRoutes);
app.use(`/api/v1/user`, profileRoute);

app.listen(PORT, () => {
    console.log("Server is running on PORT : ", PORT);
});

