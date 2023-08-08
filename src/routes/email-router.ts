import {Request, Response, Router} from "express";
import {emailAdapter} from "../adapters/email-adatper";

export const emailRouter = Router({})

class EmailController {
    async sendEmailToUser(req: Request, res: Response) {

        await emailAdapter.sendEmail(req.body.email, req.body.subject, req.body.message)
    }
}

const emailController = new EmailController()

emailRouter.post('/send', emailController.sendEmailToUser)




