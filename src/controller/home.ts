import Database from "../db";
import getCurrentLesson from "../utils/lessonTimeCounter";
import calculateVacation from "../utils/vacationCounter";
import moment from "moment";
import { NextFunction, Request, Response } from "express";

moment.locale("pl");

const getHomeData = async (req: Request, res: Response, next: NextFunction) => {
  Database.getAnnouncements()
    .then((announcements) => {
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
      getCurrentLesson()
        .then((lesson) => {
          Database.getLuckyNumber()
            .then((luckyNumber) => {
              const vacation = calculateVacation();
              res.status(200).send({
                news: announcementsArr,
                lesson: lesson,
                luckyNumber: luckyNumber,
                vacation: vacation,
              });
            })
            .catch((error) => {
              next(error);
            });
        })
        .catch((error) => {
          next(error);
        });
    })
    .catch((error) => {
      next(error);
    });
};

export default getHomeData;
