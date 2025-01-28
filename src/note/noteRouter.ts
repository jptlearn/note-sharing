import express from "express";
import { createNote } from "./noteController";
import { multer, storage } from "../middlewares/multerMiddleware";

const noteRouter = express.Router();

const upload = multer({ storage: storage });

noteRouter.route("/").post(upload.single("file"), createNote);

export default noteRouter;
