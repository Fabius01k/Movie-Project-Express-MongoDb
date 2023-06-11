import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/auth-middleware";
import {TUserDb} from "../models/users/users-type";
import {WithId} from "mongodb";


export const authRouter = Router({})

authRouter.post('/login',
    async (req: Request, res:Response) => {
    const user : WithId<TUserDb> | null = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
       console.log(user)
        if (user) {
            console.log("user found")
            const accessToken = await jwtService.createJWT(user)
            res.status(200).send({accessToken})
        } else {
            console.log("user not found")
            res.sendStatus(401)
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