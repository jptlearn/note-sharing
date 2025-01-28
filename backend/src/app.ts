import express from "express";
import cors from "cors";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import noteRouter from "./note/noteRouter";
import envConfig from "./config/config";

const app = express();
app.use(express.json());

// CORS CONFIGURATION
app.use(
  cors({
    origin: envConfig.frontendURL,
  })
);

app.use("/api/v1/notes", noteRouter);

// IMAGE PUBLIC
app.use(express.static("./src/uploads/"));

// ERROR HANDLER
app.use(globalErrorHandler);

export default app;
