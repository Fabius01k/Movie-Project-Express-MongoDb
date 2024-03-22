import {Router} from "express";
import {authenticationController} from "../../composition-root";

export const authenticationRouter = Router({})
// authRouter.get('/me', authMiddleware,
//     authController.getInformationForUser.bind(authController))
//
authenticationRouter.post('/login',
    authenticationController.loginUser.bind(authenticationController))

authenticationRouter.post('/logout',
    authenticationController.logoutUser.bind(authenticationController))

authenticationRouter.post('/refresh-token',
    authenticationController.generateNewAccessToken.bind(authenticationController))

