import {registrationService} from "../../composition-root";
import {RegistrationService} from "../service/registration-service";
import {Request, Response} from "express";
export class RegistrationController {
    constructor(
        protected registrationService: RegistrationService
    ) {
    }
    async registrationUser(req: Request, res: Response) {
        const newUser = await this.registrationService.registrationUser(
            req.body.name,
            req.body.age,
            req.body.sex,
            req.body.login,
            req.body.password,
            req.body.email)

        if (newUser) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
    }
    async registrationConfirmation(req: Request, res: Response) {
        const result = await this.registrationService.confirmationEmail(req.body.code)
        if (result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
    }
    async resendingRegistrationCode(req: Request, res: Response) {
        const result = await this.registrationService.resendingCode(req.body.email)
        if (result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
    }
    async recoveryPassword(req: Request, res: Response) {
        const result = await this.registrationService.makeNewPassword(req.body.newPassword, req.body.recoveryCode)
        if (result) {
            res.status(204).send()
        } else {
            res.sendStatus(400)
        }
    }
    async sendRecoveryCode(req: Request, res: Response) {
        await this.registrationService.resendingPasswordCode(req.body.email)
        return res.sendStatus(204)
    }
}