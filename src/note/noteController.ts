import { NextFunction, Request, Response } from "express";
import noteModel from "./noteModel";
import envConfig from "../config/config";
import createHttpError from "http-errors";

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const file = req.file
      ? `${envConfig.backendURL}/${req.file.filename}`
      : "https://cdn.mos.cms.futurecdn.net/i26qpaxZhVC28XRTJWafQS-800-80.jpeg";
    const { title, subtitle, description } = req.body;
    if (!title || !subtitle || !description) {
      res.status(400).json({
        message: "Please provide title, subtitle and description.",
      });
      return;
    }
    await noteModel.create({
      title,
      subtitle,
      description,
      file,
    });
    res.status(201).json({
      message: "Note created.",
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating note"));
  }
};

const listNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await noteModel.find();
    res.status(200).json({
      message: "Notes fetched successfully.",
      data: notes,
    });
  } catch (err) {
    return next(createHttpError(500, "Error fetching notes."));
  }
};

const listNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById(id);
    if (!note) {
      return next(createHttpError(404, "Note not found."));
    }
    res.status(200).json({
      message: "Note fetched",
      data: notes,
    });
  } catch (err) {
    return next(createHttpError(500, "Error fetching note."));
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
      message: "Note deleted.",
    });
  } catch (err) {
    return next(createHttpError(500, "Error while deleting note."));
  }
};

export { createNote, listNotes, listNote, deleteNote };
