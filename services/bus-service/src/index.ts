import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import v1Routes from "./routes/index.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", v1Routes);

app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
