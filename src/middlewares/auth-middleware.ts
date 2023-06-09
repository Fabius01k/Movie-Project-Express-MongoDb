import {NextFunction} from "express";
import {Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../domain/users-service";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization) {
        res.send(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)
    if(userId) {
        const foundUser =  await usersService.findUserById(userId.toString())

        req.userId = foundUser?.id
        next()
    }
    res.send(401)
    
}

