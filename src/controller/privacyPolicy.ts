import { NextFunction, Request, Response } from 'express';
import path from 'path';

const getPrivacyPolicy = (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).sendFile(path.join(__dirname, '../../public/privacypolicy.html'));
}

export default getPrivacyPolicy;
