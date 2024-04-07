import {Request, Response, NextFunction} from "express";
import {jwtService} from "../application/jwt-service";
import {SessionModel} from "../db/db";

export const jwtTokenValidator = async (req: Request, res: Response, next: NextFunction) => {

    const token = req.cookies.refreshToken

    if (!token && typeof token !== 'string') return res.sendStatus(401)

    const user = await jwtService.getUserIdByToken(token)

    if(!user) return res.sendStatus(401)


    const deviceIdInReq = await jwtService.getDeviceIdByToken(token)
    const creationDateOfToken = await jwtService.getTokenCreationDate(token)

    const userSessionInDb = await SessionModel.findOne({refreshToken: token})

    if(deviceIdInReq !== userSessionInDb?.deviceId &&
        creationDateOfToken !== userSessionInDb?.tokenCreationDate ) return res.sendStatus(401)
    next()
}