import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

import { createProxyMiddleware } from "http-proxy-middleware";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import routes from "./routes/index.routes.js";

const PORT = process.env.PORT || 3005;
const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;
const BUS_SERVICE_URL = process.env.BUS_SERVICE_URL;

const app = express();
app.use(cors());

app.use(
  "/auth",
  createProxyMiddleware({
    target: AUTH_SERVICE_URL,
    changeOrigin: true,
  }),
);

app.use(
  "/bus",
  createProxyMiddleware({ target: BUS_SERVICE_URL, changeOrigin: true }),
);

app.use("/", routes);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
