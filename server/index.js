import express, { urlencoded } from 'express';
const app = express();
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT } from './src/config/serverConfig.js';
import connnectionOfDB from './src/config/databaseConfig.js'

import authRoutes from "./src/routes/auth.route.js";

await connnectionOfDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(`/api/v1/auth`, authRoutes);

app.listen(PORT, () => {
    console.log("Server is running on PORT : ", PORT);
});

