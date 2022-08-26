import { NextFunction, Request, Response } from "express";
import calculateVacation from "../utils/vacationCounter";

const getVacationData = (req: Request, res: Response, next: NextFunction) => {
  const vacation = calculateVacation();
  return res.send(vacation);
};

export default getVacationData;
