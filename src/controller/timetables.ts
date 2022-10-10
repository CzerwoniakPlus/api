import { NextFunction, Request, Response } from "express";
import fs from 'fs';

const getTimetables = async (req: Request, res: Response, next: NextFunction) => {
    if(!fs.existsSync('json/timetables.json')) return res.status(200).send({dataSet: [], timetables: {}});
    try {
      const data = await fs.promises.readFile('json/timetables.json', 'utf8');
      res.status(200).json(JSON.parse(data));
    } catch (ex) {
      next(ex);
    }
};

const insertTimetables = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  const authSecret = req.header("Auth-Secret");
  if (authSecret !== process.env.AUTH_SECRET) return res.sendStatus(401);
  if (!body) return res.sendStatus(400);
  const timetablesObject: {[index: string]: string} = body;
  let index = 0;
  const referenceList = [];
  const timetablesList: {[index: string]: string} = {};
  for(let key in timetablesObject) {
    referenceList.push({id: index.toString(), name: key});
    timetablesList[index.toString()]= timetablesObject[key];
    index++;
  }
  const finalObject = {
    dataSet: referenceList,
    timetables: timetablesList
  }
  try {
    await fs.promises.writeFile('json/timetables.json', JSON.stringify(finalObject));
    res.sendStatus(201);
  } catch (ex) {
    next(ex);
  }  
};

export default {
  getTimetables,
  insertTimetables,
};
