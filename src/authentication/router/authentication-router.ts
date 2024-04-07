import {Router} from "express";
import {authenticationController} from "../../composition-root";
import {jwtTokenValidator} from "../../middlewares/jwt-authorization-middleware";

export const authenticationRouter = Router({})

authenticationRouter.get('/me', jwtTokenValidator,
    authenticationController.getAccountDataUser.bind(authenticationController))


authenticationRouter.post('/login',
    authenticationController.loginUser.bind(authenticationController))

authenticationRouter.post('/logout',jwtTokenValidator,
    authenticationController.logoutUser.bind(authenticationController))

authenticationRouter.post('/refresh-token',jwtTokenValidator,
    authenticationController.generateNewAccessToken.bind(authenticationController))

