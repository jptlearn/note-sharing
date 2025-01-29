import express from "express";
import {
  createNote,
  deleteNote,
  listNotes,
  listNote,
  updateNote,
  updateFile,
} from "./noteController";
import { multer, storage } from "../middlewares/multerMiddleware";

const noteRouter = express.Router();

const upload = multer({ storage: storage });

noteRouter.route("/").get(listNotes).post(upload.single("file"), createNote);

noteRouter.route("/:id").get(listNote).delete(deleteNote);

noteRouter.route("/:id/details").patch(updateNote);

noteRouter.route("/:id/file").patch(upload.single("file"), updateFile);

export default noteRouter;
