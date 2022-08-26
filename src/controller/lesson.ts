import { NextFunction, Request, Response } from "express";
import getCurrentLesson from "../utils/lessonTimeCounter";

const getCurrentLessonData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  getCurrentLesson()
    .then((lesson) => {
        return res.send(lesson);
    })
    .catch((error) => {
      next(error);
    });
};

export default getCurrentLessonData;
