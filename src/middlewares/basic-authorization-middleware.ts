import {Request, Response, NextFunction} from "express";
// YWRtaW46cXdlcnR5 => admin:qwerty
export const basicAuthorizationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const [authType, authValue] = authHeader.split(' ', 2);
        if (authType.toLowerCase() === 'basic') {
            const [username, password] = Buffer.from(authValue, 'base64').toString().split(':', 2);
            // [admin, qwerty]
            if (username === 'admin' && password === 'qwerty') {
                return next();
            }
        }
    }

    return res.sendStatus(401)
};
