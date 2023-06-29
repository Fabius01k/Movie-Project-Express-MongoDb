import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {TUserDb} from "../models/users/users-type";
import {WithId} from "mongodb";
import {authService} from "../domain/auth-service";
import {userAuthCreateValidators} from "../validadation/user-validatoin";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";
import {TUserAccountDb} from "../models/user-account/user-account-types";


export const authRouter = Router({})

authRouter.post('/login',
    async (req: Request, res:Response) => {
    const user : WithId<TUserAccountDb> | null = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)

        // console.log(user,"router")
        if (user) {
            const accessToken = await jwtService.createJWT(user)
            res.status(200).send({accessToken})
        } else {
            res.sendStatus(401)
        }

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

authRouter.post('/registration-confirmation',
    async (req: Request, res:Response) => {

    const result = await authService.confirmEmail(req.body.code)
        if(result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
})

authRouter.post('/registration-email-resending',
    async (req: Request, res:Response) => {
        console.log("resending router")

        const result = await authService.resendingCode(req.body.email)
        if(result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
})

authRouter.get('/me',authMiddleware,
    async (req: Request, res: Response) => {

    const authUser = await usersService.findAuthUser(req.userId!)

        if (authUser) {
            res.status(200).send(authUser)
        } else {
            res.sendStatus(401)
        }

    })