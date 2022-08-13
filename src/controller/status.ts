import { NextFunction, Request, Response } from 'express';

const getStatus = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).send("OK");
};

export default getStatus;