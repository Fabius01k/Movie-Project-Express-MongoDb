import {Request, Response, Router} from "express";
import {jwtService} from "../application/jwt-service";
import {SecurityService} from "../domain/security-service";
import {tokenUserValidator} from "../validadation/authorization-validatoin";
import {UsersSessionView} from "../models/user-account/user-account-types";

import {deleteSessionByIdVavidation} from "../validadation/security-validation";
import {securityController} from "../composition-root";

export const securityRouter = Router({})

export class SecurityController {
        constructor(
            protected securityService:SecurityService
        ) {}
        async getAllActiveUsersSession(req: Request, res: Response) {
                const token = req.cookies.refreshToken
                const sessionId = await jwtService.getUserIdByToken(token)
                const sessionOfUser: UsersSessionView[] = await this.securityService.getUserSessions(sessionId)

                res.status(200).send(sessionOfUser)
        }
        async deleteAllOthersSessions(req: Request, res: Response) {
                const token = req.cookies.refreshToken
                const sessionId = await jwtService.getUserIdByToken(token)

                const deviceId = await jwtService.getDeviceIdByToken(token)

                await this.securityService.deleteOtherSessions(sessionId, deviceId)

                return res.sendStatus(204)
        }
        async deleteSessionById(req: Request, res: Response) {
                const deviceId = req.params.deviceId

                await this.securityService.deleteSessionByDeviceId(deviceId)

                return res.sendStatus(204)
        }
}


securityRouter.get('/devices', tokenUserValidator,
    securityController.getAllActiveUsersSession.bind(securityController))

securityRouter.delete('/devices', tokenUserValidator,
    securityController.deleteAllOthersSessions.bind(securityController))

securityRouter.delete('/devices/:deviceId',tokenUserValidator, deleteSessionByIdVavidation,
    securityController.deleteSessionById.bind(securityController))