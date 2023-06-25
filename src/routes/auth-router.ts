import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {TUserDb} from "../models/users/users-type";
import {WithId} from "mongodb";
import {authService} from "../domain/auth-service";
import {userAuthCreateValidators} from "../validadation/user-validatoin";
import {inputValidationMiddleware} from "../middlewares/input-validation-middleware";


export const authRouter = Router({})

authRouter.post('/login',
    async (req: Request, res:Response) => {
    const user : WithId<TUserDb> | null = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)

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
            res.status(200).send()
        } else {
            res.sendStatus(400)
        }
})

authRouter.post('/registration-confirmation',
    async (req: Request, res:Response) => {

    const result = await authService.confirmEmail(req.body.code, req.body.email)
        if(result) {
            res.status(200).send()
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