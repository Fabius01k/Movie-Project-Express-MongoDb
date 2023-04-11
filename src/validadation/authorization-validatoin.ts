import {Request, Response, NextFunction} from "express";


export const basicAuthGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const [authType, authValue] = authHeader.split(' ', 2);
        if (authType.toLowerCase() === 'basic') {
            const [username, password] = Buffer.from(authValue, 'base64').toString().split(':', 2);
            if (username === 'admin' && password === 'qwerty') {
                return next();
            }
        }
    }

    return res.sendStatus(401)
};