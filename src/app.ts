import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import noteRouter from "./note/noteRouter";

const app = express();
app.use(express.json());
app.use(express.static(".src/uploads/"));

app.use("/api/v1/notes", noteRouter);
app.use(globalErrorHandler);

export default app;
