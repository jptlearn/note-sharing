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
      data: note,
    });
  } catch (err) {
    return next(createHttpError(500, "Error fetching note."));
  }
};

const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!id) {
      return next(createHttpError(400, "Id requrired"));
    }
    const { title, subtitle, description } = req.body;
    if (!title || !subtitle || !description) {
      return next(
        createHttpError(401, "At least one field should be provided")
      );
    }
    const updateData: any = {};
    if (title) updateData.title = title;
    if (subtitle) updateData.subtitle = subtitle;
    if (description) updateData.description = description;

    const note = await noteModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!note) {
      return next(createHttpError(404, "Not not found with the given id."));
    }
    res.status(200).json({
      message: "Note updated.",
      data: note,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while updating note."));
  }
};

const updateFile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return next(createHttpError(400, "ID required")); // Changed to 400 Bad Request
    }

    const file = req.file;

    // Check if file is provided
    if (!file) {
      return next(createHttpError(400, "File required.")); // Changed to 400 Bad Request
    }

    const filePath = `${envConfig.backendURL}/${file.filename}`;

    // Update the note with the new file path
    const note = await noteModel.findByIdAndUpdate(
      id,
      { file: filePath },
      { new: true }
    ); // Use { new: true } to return the updated document

    // Check if the note was found and updated
    if (!note) {
      return next(createHttpError(404, "Note not found.")); // Handle case where note is not found
    }

    // Send success response
    res.status(200).json({
      message: "File has been updated.",
      data: note,
    });
  } catch (err) {
    // Handle unexpected errors
    return next(createHttpError(500, "Error updating file."));
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

export { createNote, listNotes, listNote, updateNote, updateFile, deleteNote };
