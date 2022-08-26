import { NextFunction, Request, Response } from "express";
import fs from 'fs';

const getSchoolNews = (req: Request, res: Response, next: NextFunction) => {
    const news = fs.readFileSync('./json/news.json', 'utf8');
    res.send(news);
};

export default getSchoolNews;