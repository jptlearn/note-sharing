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
    next(createHttpError(500, "Error while creating note"));
  }
};

export { createNote };
