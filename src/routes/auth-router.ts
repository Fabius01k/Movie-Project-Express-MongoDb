import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {TUserDb} from "../models/users/users-type";
import {WithId} from "mongodb";
import {authService} from "../domain/auth-service";
import {userAuthCreateValidators} from "../validadation/user-validatoin";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {TUserAccountDb,UsersSessionDb} from "../models/user-account/user-account-types";
import {emailCodeResendingValidator, registrationCodeValidator} from "../validadation/registration-validation";
import {randomUUID} from "crypto";
import {tokenUserValidator} from "../validadation/authorization-validatoin";
import {v4 as uuid} from "uuid";
import {rateLimitMiddleware} from "../middlewares/rate-limitmiddleware";


export const authRouter = Router({})


authRouter.get('/me',authMiddleware,
    async (req: Request, res: Response) => {

        const token = req.headers.authorization!.split(' ')[1]

        const userId = await jwtService.getUserIdByToken(token)
        const authUser = await usersService.findAuthUser(userId)

        if (!authUser) return res.sendStatus(401);

        return res.status(200).send({email: authUser.email, login: authUser.login, userId: authUser.id
        });

    })

authRouter.post('/login',rateLimitMiddleware,
    async (req: Request, res:Response) => {
    const user : WithId<TUserAccountDb> | null = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)


        if (user) {
            const accessToken = await jwtService.createAccessJWT(user.id)
            const refreshTokenPayload = {
                deviceId: accessToken,
            }
            const refreshToken = await jwtService.createRefreshJWT(user.id, refreshTokenPayload)


            const sessionId = user.id
            const ip = req.ip
            const title = req.headers['user-agent'] || 'Unknown'
            const deviceId = await jwtService.getDeviceIdByToken(refreshToken)

            await authService.createSession(sessionId,ip,title,deviceId,refreshToken)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 20 * 1000,
            })

           return res.status(200).send({accessToken});
        } else {
            return res.sendStatus(401)
        }
})

authRouter.post('/refresh-token',rateLimitMiddleware,tokenUserValidator,
    async (req: Request, res:Response) => {

        const token = req.cookies.refreshToken

    const userForResend = await jwtService.getUserIdByToken(token)

        const accessToken = await jwtService.createAccessJWT(userForResend)
        const refreshTokenPayload = {
            deviceId: accessToken,
        }
        const refreshToken = await jwtService.createRefreshJWT(userForResend,refreshTokenPayload)

        const deviceIdOfSession = await jwtService.getDeviceIdByToken(token)
        const deviceId = deviceIdOfSession

    await authService.changeDataInSession(deviceId,refreshToken)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 20 * 1000,
    })

    return res.status(200).send({accessToken})
})

authRouter.post('/logout',rateLimitMiddleware,tokenUserValidator,
    async (req: Request, res:Response) => {

        const token = req.cookies.refreshToken

        const deviceIdOfSession = await jwtService.getDeviceIdByToken(token)
        const deviceId = deviceIdOfSession
        const refreshToken = uuid()

        // await authService.makeTokenIncorrect(deviceId,refreshToken)
        await authService.deleteSession(deviceId)

        res.clearCookie('refreshToken')
       return res.sendStatus(204)
})


authRouter.post('/registration',rateLimitMiddleware,userAuthCreateValidators,inputValidationMiddleware,
    async (req: Request, res:Response) => {
    const user = await authService.createUserAuth(req.body.login, req.body.password, req.body.email)
        if(user) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
})

authRouter.post('/registration-confirmation',rateLimitMiddleware,registrationCodeValidator,inputValidationMiddleware,
    async (req: Request, res:Response) => {

        console.log("star confirmation - router")

    const result = await authService.confirmEmail(req.body.code)
        if(result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
})

authRouter.post('/registration-email-resending',rateLimitMiddleware,emailCodeResendingValidator,inputValidationMiddleware,
    async (req: Request, res:Response) => {
        console.log("resending router")

        const result = await authService.resendingCode(req.body.email)
        if(result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
})




// authRouter.get('/me',authMiddleware,
//     async (req: Request, res: Response) => {
//
//     const authUser = await usersService.findAuthUser(req.userId!)
//
//         if (authUser) {
//             res.status(200).send(authUser)
//         } else {
//             res.sendStatus(401)
//         }
// })