import {Request, Response, NextFunction} from "express";
import {usersAccountTokenColletion} from "../db/db";
import {jwtService} from "../application/jwt-service";


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

export const tokenUserValidator = async (req: Request, res: Response, next: NextFunction) => {
console.log('start')
    const token = req.cookies.refreshToken
    console.log('Token', token)
    if (typeof token !== 'string') return res.sendStatus(401)

    const userInDb = jwtService.getUserIdByToken(token)
    const tokenInBlackList = await usersAccountTokenColletion.findOne({userId: userInDb, usedRefreshToken:{$in:[token]}  })

    if(tokenInBlackList) return res.sendStatus(401)

    const userRefreshTokenInDB = await usersAccountTokenColletion.findOne({refreshToken: token})
    if(userInDb !== userRefreshTokenInDB?.userId) return res.sendStatus(401)

    next()
}

// export const tokenUserValidator = async (req: Request, res: Response, next: NextFunction) => {
//
//     const token = req.cookies.refreshToken
//     if (typeof token !== 'string') return res.sendStatus(401)
//
//
//     const userRefreshTokenInDB = await usersAccountTokenColletion.findOne({refreshToken: token})
//     const refreshTokenVerification = jwtService.getUserIdByToken(token)
//     if(!refreshTokenVerification || !userRefreshTokenInDB) return res.sendStatus(401)
//
//     next()
// }


