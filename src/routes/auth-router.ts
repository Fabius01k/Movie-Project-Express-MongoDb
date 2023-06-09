import {Request, Response, Router} from "express";
import {usersService} from "../domain/users-service";
import {jwtService} from "../application/jwt-service";
import {authMiddleware} from "../middlewares/auth-middleware";


export const authRouter = Router({})

authRouter.post('/login',
    async (req: Request, res:Response) => {
    const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if (user && typeof user === 'object') {
            const token = await jwtService.createJWT(user)
            res.status(200).send(token)
        } else {
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