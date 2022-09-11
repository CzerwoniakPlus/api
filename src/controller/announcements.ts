import { NextFunction, Request, Response } from "express";
import Database from "../db";
import moment from "moment";

const getAnnouncements = (req: Request, res: Response, next: NextFunction) => {
  Database.getAnnouncements().then((announcements) => {
    let announcementsArr: Object[] = [];
    announcements.forEach((e) => {
      //@ts-ignore
      let day = moment.unix(e.val().time);
      announcementsArr.push({
        //@ts-ignore
        content: e.val().content,
        time: day.fromNow(),
      });
    });
    res.send(announcementsArr);
  });
};

const insertAnnouncement = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const content: string = req.body.content;
  const time: number = Math.floor(Date.now() / 1000);
  const authSecret = req.header("Auth-Secret");
  if (authSecret !== process.env.AUTH_SECRET) return res.sendStatus(401);
  if (!content) return res.sendStatus(400);
  Database.insertAnnouncement(content, time)
    .then(() => {
      Database.sendNotification("Ogłoszenie", content, "announcementsV2")
        .then(() => {
          return res.sendStatus(201);
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

export default {
  getAnnouncements,
  insertAnnouncement,
};
