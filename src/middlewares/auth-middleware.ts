import {NextFunction} from "express";
import {Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";
import {ObjectId} from "mongodb";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Start Validation')
    if (!req.headers.authorization) return  res.sendStatus(401);

    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
console.log('VALID userId', userId);
    if(!userId) return res.sendStatus(401);

    const foundUser =  await usersService.findUserById(userId)
    //if(!foundUser)=> 401
    req.userId = foundUser?.id
    next()




}

// export const authTokenGetMiddleware = async (req: Request, res: Response, next: NextFunction) => {
//
//     const token = req.cookies.accessToken
//     if(!token) return res.sendStatus(401)
//
// }