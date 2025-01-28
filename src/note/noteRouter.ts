import express from "express";
import { createNote } from "./noteController";

const noteRouter = express.Router();

noteRouter.route("/").post(createNote);

export default noteRouter;
