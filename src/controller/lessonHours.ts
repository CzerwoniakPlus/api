import lessonHours from "../../json/lessonHours.json";
import lessonHoursShort from "../../json/lessonShort.json";
import Database from "../db";
import { NextFunction, Request, Response } from "express";

const getLessonHours = (req: Request, res: Response, next: NextFunction) => {
  Database.getShortenedLessonsStatus().then((areLessonsShortened) => {
    if (areLessonsShortened) {
      res.json(lessonHoursShort);
    } else {
      res.json(lessonHours);
    }
  });
};

const setShortenedLessonsStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: string = req.body.shortened;
  if(!status) return res.sendStatus(400);
  const isShortened: boolean = (status === 'true');
  const authSecret = req.header("Auth-Secret");
  if (authSecret !== process.env.AUTH_SECRET) return res.sendStatus(401);
  if (typeof status === "undefined") return res.sendStatus(400);
  Database.setShortenedLessonsStatus(isShortened)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((error) => {
      next(error);
    });
};

export default {
  getLessonHours,
  setShortenedLessonsStatus,
};
