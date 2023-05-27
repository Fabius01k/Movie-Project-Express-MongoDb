import {Request, Response, NextFunction} from "express";


export const basicAuthGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // Basic YWRtaW46cXdlcnR5
    const authHeader = req.headers.authorization;

    if (authHeader) {
        //["Basic", "YWRtaW46cXdlcnR5"]
        const [authType, authValue] = authHeader.split(' ', 2);
        if (authType.toLowerCase() === 'basic') {
            // YWRtaW46cXdlcnR5 => admin:qwerty
            const [username, password] = Buffer.from(authValue, 'base64').toString().split(':', 2);
            // [admin, qwerty]
            if (username === 'admin' && password === 'qwerty') {
                return next();
            }
        }
    }

    return res.sendStatus(401)
};

