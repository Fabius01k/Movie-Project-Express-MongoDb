import {Router} from "express";
import {registrationController} from "../../composition-root";

export const registrationRouter = Router({})

registrationRouter.post('/registration',
    registrationController.registrationUser.bind(registrationController))

registrationRouter.post('/registration-confirmation',
    registrationController.registrationConfirmation.bind(registrationController))

registrationRouter.post('/registration-email-resending',
    registrationController.resendingRegistrationCode.bind(registrationController))

registrationRouter.post('/new-password',
    registrationController.recoveryPassword.bind(registrationController))

registrationRouter.post('/password-recovery',
    registrationController.sendRecoveryCode.bind(registrationController))