import {UserRepository} from "../users/repository/user-repository";
import {User} from "../users/classes/user-class";
import {emailAdapter} from "../adapters/email-adapter";

export class EmailManager {
    constructor(
        protected usersRepository: UserRepository
    ) {}

    async sendEmailConfirmationMessage(userAccount: User) {

        const userConfirmationCode = userAccount.emailConfirmationData.confirmationCode
        const email = userAccount.accountData.email

        const message = `<h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
            <a href=https://project-nu-silk.vercel.app/registration-confirmation?code=${userConfirmationCode}>complete registration</a>
        </p>`

        const subject = "Код подтверждения регистрации"

        await emailAdapter.sendEmail(email, subject, message)
    }

    async resendEmailConfirmationMessage(email: string, code: string) {

        const message = `<h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
            <a href='https://project-nu-silk.vercel.app/registration-confirmation?code=${code}'>complete registration</a>
        </p>`
        const subject = "Новый код подтверждения регистрации"

        await emailAdapter.sendEmail(email, subject, message)
    }

    async resendPasswordCodeMessage(email: string, code: string) {

        const message = `<h1>Password recovery</h1>
        <p>To finish registration please follow the link below:
            <a href='https://project-nu-silk.vercel.app/password-recovery?recoveryCode=${code}'>recovery password</a>
        </p>`
        const subject = "Код восстановления пароля"

        await emailAdapter.sendEmail(email, subject, message)
    }
}