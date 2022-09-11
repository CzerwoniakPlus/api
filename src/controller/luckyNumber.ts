import { NextFunction, Request, Response } from "express";
import Database from "../db";
import * as dotenv from "dotenv";
dotenv.config();

const getLuckyNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Database.getLuckyNumber()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((error) => {
      next(error);
    });
};

const setLuckyNumber = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const number: number = req.body.number;
  const authSecret = req.header("Auth-Secret");
  if (authSecret !== process.env.AUTH_SECRET) return res.sendStatus(401);
  if (!number) return res.sendStatus(400);
  const today = new Date();
  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  let days = [
    "W niedzielę",
    "W poniedziałek",
    "We wtorek",
    "W środę",
    "W czwartek",
    "W piątek",
    "W sobotę",
  ];
  let d = new Date(tomorrow);
  let dayName = days[d.getDay()];
  let month = Math.floor(tomorrow.getMonth() + 1);
  let data =
    " (" +
    tomorrow.getDate() +
    "." +
    month +
    "." +
    tomorrow.getFullYear() +
    ")";
  const message =
    dayName + data + " zwolniony od odpowiedzi ustnej jest numer:";
  if (month == 7 || month == 8) {
    // ---------------------------------------------------------------
    // During summer vacation, the lucky number is not selected by online school register.
    // Therefore, the lucky number is set to -1 with message "Enjoy your vacation".
    // When client app recieves this response, it won't display the lucky number.
    // Instead, it will display the message "Enjoy your vacation".
    // ---------------------------------------------------------------
    Database.setLuckyNumber(-1, "Miłego wypoczynku!")
      .then(() => {
        return res.sendStatus(201);
      })
      .catch((error) => {
        next(error);
      });
  } else {
    Database.setLuckyNumber(number, message)
      .then(() => {
        Database.sendNotification(
          "Szczęśliwy numerek",
          `${message} ${number}`,
          "luckyNumberV2"
        )
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
  }
};

export default {
  getLuckyNumber,
  setLuckyNumber,
};
