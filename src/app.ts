import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import noteRouter from "./note/noteRouter";

const app = express();

app.use(globalErrorHandler);

app.use("/api/v1/notes", noteRouter);

export default app;
