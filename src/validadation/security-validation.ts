import {NextFunction, Request, Response} from "express";
import {jwtService} from "../application/jwt-service";
import {usersAccountTokenColletion} from "../db/db";


export const deleteSessionByIdVavidation = async (req: Request, res: Response, next: NextFunction) => {

    const deviceId = req.params.deviceId
    if (typeof deviceId !== 'string') return res.sendStatus(401)

    const token = req.cookies.refreshToken

    const creationDateOftoken = await jwtService.getTokenCreationDate(token)
    const ownerOfSendToken = await jwtService.getUserIdByToken(token)
    const userSessionInDb = await usersAccountTokenColletion.findOne({deviceId: deviceId})

    if(!userSessionInDb) return res.sendStatus(404)

    if(ownerOfSendToken !== userSessionInDb?.sessionId) return res.sendStatus(403)

    if(deviceId !== userSessionInDb?.deviceId &&
        creationDateOftoken !== userSessionInDb?.tokenCreationDate ) return res.sendStatus(401)
    next()
}