import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {TUserDb} from "../models/users/users-type";
import {WithId} from "mongodb";
import {authService} from "../domain/auth-service";
import {userAuthCreateValidators} from "../validadation/user-validatoin";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {TUserAccountDb,TokensOfUserDb} from "../models/user-account/user-account-types";
import {emailCodeResendingValidator, registrationCodeValidator} from "../validadation/registration-validation";
import {randomUUID} from "crypto";
import {tokenUserValidator} from "../validadation/authorization-validatoin";


export const authRouter = Router({})


authRouter.get('/me',authMiddleware,
    async (req: Request, res: Response) => {
        console.log('HERE')
        const token = req.headers.authorization!.split(' ')[1]

        const userId = await jwtService.getUserIdByToken(token)
        console.log('Router userId', userId);
        const authUser = await usersService.findAuthUser(userId)

        if (!authUser)  return res.sendStatus(401);

        return res.status(200).send(authUser);

    })

authRouter.post('/login',
    async (req: Request, res:Response) => {
    const user : WithId<TUserAccountDb> | null = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)


        if (user) {
            const accessToken = await jwtService.createAccessJWT(user.id)
            const refreshToken = await jwtService.createRefreshJWT(user.id)

            console.log(accessToken,"accessToken in login")
            console.log(refreshToken,"refreshToken in login")

            const userId = user.id

            await authService.saveTokensUser(userId, refreshToken,)

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                // maxAge: 20 * 1000,
            })

           return res.status(200).send({accessToken});
        } else {
            return res.sendStatus(401)
        }
})

authRouter.post('/refresh-token',tokenUserValidator,
    async (req: Request, res:Response) => {

        const token = req.cookies.refreshToken

    const userForResend = await jwtService.getUserIdByToken(token)

        await authService.addTokenToBlackList(userForResend,token)

        const accessToken = await jwtService.createAccessJWT(userForResend)
        const refreshToken = await jwtService.createRefreshJWT(userForResend)

    //console.log(accessToken,"new accessToken in login")
   // console.log(refreshToken,"new refreshToken in login")

    const userId = userForResend
    await authService.changeTokenUser(userId,refreshToken)

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
    //     maxAge: 20 * 1000,
    })

    return res.status(200).send({accessToken})
})

authRouter.post('/logout',tokenUserValidator,
    async (req: Request, res:Response) => {

        const token = req.cookies.refreshToken

        const userForResend = await jwtService.getUserIdByToken(token)

        await authService.addTokenToBlackList(userForResend,token)

       // const userId = userForResend
        //await authService.makeTokenIncorrect(userId)

        res.clearCookie('refreshToken')
       return res.sendStatus(204)
})


authRouter.post('/registration',userAuthCreateValidators,inputValidationMiddleware,
    async (req: Request, res:Response) => {
    const user = await authService.createUserAuth(req.body.login, req.body.password, req.body.email)
        if(user) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
})

authRouter.post('/registration-confirmation',registrationCodeValidator,inputValidationMiddleware,
    async (req: Request, res:Response) => {

        console.log("star confirmation - router")

    const result = await authService.confirmEmail(req.body.code)
        if(result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
})

authRouter.post('/registration-email-resending',emailCodeResendingValidator,inputValidationMiddleware,
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