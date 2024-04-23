import {User} from "../../users/classes/user-class";
import {Request, Response, Router} from "express";
import {jwtService} from "../../application/jwt-service";
import {v4 as uuidv4} from "uuid";
import {AuthenticationService} from "../service/authentication-service";
import {AdminService} from "../../admin/service/admin-service";

export class AuthenticationController {
    constructor(
        protected authenticationService: AuthenticationService,
        protected adminService: AdminService,
    ) {}

    async loginUser(req: Request, res: Response) {
        const user: User | null = await this.authenticationService.checkCredentials(req.body.loginOrEmail, req.body.password)

        if (user) {
            const accessToken = await jwtService.createAccessJWT(user.id)
            const refreshTokenPayload = {
                deviceId: uuidv4(),
            }
            const refreshToken = await jwtService.createRefreshJWT(user.id, refreshTokenPayload)
            const ip = req.ip
            const title = req.headers['user-agent'] || 'Unknown'

            await this.authenticationService.createSession(user.id, ip, title, refreshTokenPayload.deviceId, refreshToken)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 20 * 1000,
            })
            console.log(refreshToken)

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

        console.log(refreshToken)
        return res.status(200).send({accessToken})
    }
    async getAccountDataUser(req: Request, res: Response) {
        const token = req.headers.authorization!.split(' ')[1]

        const userId = await jwtService.getUserIdByToken(token)
        const authUser: User| null = await this.adminService.findUserById(userId)

        if (!authUser) return res.sendStatus(401);

        return res.status(200).send({
            userId: authUser.id,
            name: authUser.accountData.name,
            age: authUser.accountData.age,
            sex: authUser.accountData.sex,
            login: authUser.accountData.login,
            email: authUser.accountData.email,
        });
    }
}