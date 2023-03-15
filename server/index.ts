import router from "./src/routes/index.js";
import express from "express";
import cors from "cors";

import { config } from "dotenv";
const cfg = config();

const PORT: number = +process.env.PORT || 5000;

const app: express.Express = express();
app.use(express.json());
app.use(cors());
app.use("/api", router);

const start = async (): Promise<void> => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
        console.error(error);
    }
};

start();
