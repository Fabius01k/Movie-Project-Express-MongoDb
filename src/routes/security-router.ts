import {Request, Response, Router} from "express";
import {jwtService} from "../application/jwt-service";
import {securityServise} from "../domain/security-servide";
import {tokenUserValidator} from "../validadation/authorization-validatoin";


export const securityRouter = Router({})

securityRouter.get('/devices',tokenUserValidator,
    async (req: Request, res: Response) => {

    const token = req.cookies.refreshToken
    const user = await jwtService.getUserIdByToken(token)
    const sessionId = user.id

const sessionOfUser = await securityServise.getUserSessions(sessionId)

        res.status(200).send(sessionOfUser)
})

securityRouter.delete('/devices',tokenUserValidator,
    async (req: Request, res: Response) => {

        const token = req.cookies.refreshToken
        const user = await jwtService.getUserIdByToken(token)
        const sessionId = user.id
        const deviceIdOfSession = await jwtService.getDeviceIdByToken(token)
        const deviceId = deviceIdOfSession

        await securityServise.deleteOtherSessions(sessionId,deviceId)

        return res.sendStatus(204)
        })

securityRouter.delete('/devices/:deviceId',tokenUserValidator,
    async (req: Request, res: Response) => {

        const deviceId = req.params.deviceId

        await securityServise.deleteSessionByDeviceId(deviceId)

        return res.sendStatus(204)
    })