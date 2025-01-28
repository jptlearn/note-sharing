import express from "express";
import { createNote, deleteNote, listNotes, listNote } from "./noteController";
import { multer, storage } from "../middlewares/multerMiddleware";

const noteRouter = express.Router();

const upload = multer({ storage: storage });

noteRouter.route("/").get(listNotes).post(upload.single("file"), createNote);

noteRouter.route("/:id").get(listNote).delete(deleteNote);

export default noteRouter;
