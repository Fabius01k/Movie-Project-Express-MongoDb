import {NextFunction} from "express";
import {Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";
import {ObjectId} from "mongodb";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        console.log("no auth header")
        res.sendStatus(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    console.log(userId, "user id from token")
    if(userId) {
        const foundUser =  await usersService.findUserById(userId.toString())
        console.log(foundUser, "foundUser in authMiddleware")
        console.log(userId, "userId in authMiddleware")
        req.userId = foundUser?.id
        next()

    } else {
        console.log("no user found")
        return res.sendStatus(401)
    }
}

