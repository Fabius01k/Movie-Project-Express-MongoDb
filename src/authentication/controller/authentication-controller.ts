import {User} from "../../users/classes/user-class";
import {Request, Response, Router} from "express";
import {jwtService} from "../../application/jwt-service";
import {v4 as uuidv4} from "uuid";
import {AuthenticationService} from "../service/authentication-service";

export class AuthenticationController {
    constructor(
        protected authenticationService: AuthenticationService,
    ) {}

    async loginUser(req: Request, res: Response) {
        const user: User | null = await this.authenticationService.checkCredentials(req.body.loginOrEmail, req.body.password)

        if (user) {
            const accessToken = await jwtService.createAccessJWT(user.id)
            const refreshTokenPayload = {
                deviceId: uuidv4(),
            }
            const refreshToken = await jwtService.createRefreshJWT(user.id, refreshTokenPayload)
            const sessionId = user.id
            const ip = req.ip
            const title = req.headers['user-agent'] || 'Unknown'

            await this.authenticationService.createSession(sessionId, ip, title, refreshTokenPayload.deviceId, refreshToken)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 20 * 1000,
            })

            return res.status(200).send({accessToken});
        } else {
            return res.sendStatus(401)
        }
    }
    async logoutUser(req: Request, res: Response) {

        const token = req.cookies.refreshToken

        const deviceId = await jwtService.getDeviceIdByToken(token)

        await this.authenticationService.deleteSession(deviceId)

        res.clearCookie('refreshToken')
        return res.sendStatus(204)
    }
    async generateNewAccessToken(req: Request, res: Response) {

        const token = req.cookies.refreshToken
        const userForResend = await jwtService.getUserIdByToken(token)
        const accessToken = await jwtService.createAccessJWT(userForResend)
        const oldDeviceID = await jwtService.getDeviceIdByToken(token)

        const refreshTokenPayload = {
            deviceId: oldDeviceID,
        }
        const refreshToken = await jwtService.createRefreshJWT(userForResend, refreshTokenPayload)

        await this.authenticationService.changeDataInSession(oldDeviceID, refreshToken)

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 20 * 1000,
        })

        return res.status(200).send({accessToken})
    }


    // async registrationConfirmationUser(req: Request, res: Response) {
    //
    //     const result = await this.authService.confirmEmail(req.body.code)
    //     if (result) {
    //         res.status(204).send()
    //     } else {
    //         res.sendStatus(400)
    //     }
    // }
    // async resendingRegistrationCode(req: Request, res: Response) {
    //
    //     const result = await this.authService.resendingCode(req.body.email)
    //     if (result) {
    //         res.status(204).send()
    //     } else {
    //         res.sendStatus(400)
    //     }
    // }
    // async recoverPasswordForUser(req: Request, res: Response) {
    //     const result = await this.authService.makeNewPasswordByResendingCode(req.body.newPassword, req.body.recoveryCode)
    //     if (result) {
    //         res.status(204).send()
    //     } else {
    //         res.sendStatus(400)
    //     }
    // }
    // async sendRecoveryCodeForUser(req: Request, res: Response) {
    //
    //     await this.authService.resendingPasswordCode(req.body.email)
    //     return res.sendStatus(204)
    // }
}