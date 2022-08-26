import { NextFunction, Request, Response } from 'express';
import timetableURLExtractor from '../utils/timetableURLExtractor';

const getTimetableURL = async (req: Request, res: Response, next: NextFunction) => {
        const timetableURL = await timetableURLExtractor();
        if (timetableURL) {
            res.send(timetableURL);
        } else {
            res.sendStatus(204);
        }
};

export default getTimetableURL;