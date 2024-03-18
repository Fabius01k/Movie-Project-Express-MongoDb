import {Router} from "express";
import {authenticationController} from "../../composition-root";

export const authenticationRouter = Router({})



// authRouter.get('/me', authMiddleware,
//     authController.getInformationForUser.bind(authController))
//
authenticationRouter.post('/login',
    authenticationController.loginUser.bind(authenticationController))
//
// authRouter.post('/refresh-token', tokenUserValidator,
//     authController.genereteNewTokensForUser.bind(authController))
//
// authRouter.post('/logout', tokenUserValidator,
//     authController.logoutUser.bind(authController))
//
// authRouter.post('/registration', rateLimitMiddleware, userAuthCreateValidators, inputValidationMiddleware,
//     authController.registrationUser.bind(authController))
//
// authRouter.post('/registration-confirmation', rateLimitMiddleware, registrationCodeValidator, inputValidationMiddleware,
//     authController.registrationConfirmationUser.bind(authController))
//
// authRouter.post('/registration-email-resending', rateLimitMiddleware, emailCodeResendingValidator,
//     inputValidationMiddleware,
//     authController.resendingRegistrationCode.bind(authController))
//
// authRouter.post('/new-password', rateLimitMiddleware, PasswordResendingCodeValidator,
//     inputValidationMiddleware,
//     authController.recoverPasswordForUser.bind(authController))
//
// authRouter.post('/password-recovery', rateLimitMiddleware, emailPasswordResendingValidator,
//     inputValidationMiddleware,
//     authController.sendRecoveryCodeForUser.bind(authController))