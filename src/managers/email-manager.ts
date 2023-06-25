import {TUserAccountDb} from "../models/user-account/user-account-types";
import {emailAdapter} from "../adapters/email-adatper";
import {usersRepository} from "../repositories-db/users-repository-db";


export const emailManager = {

    async sendEmailconfirmationMessage(userAccount: TUserAccountDb) {

        const userConfirmationCode = userAccount.emailConfirmation.confirmationCode

        const email = userAccount.accountData.userName.email
        const message = String.raw`
            <h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
            <a href="https://somesite.com/confirm-email?code=${userConfirmationCode}">complete registration</a>
        </p>`

        const subject = "Код подтверждения регистрации"

        await emailAdapter.sendEmail(email, message, subject)

    },

    async resendEmailconfirmationMessage(email: string, code: string) {

        const user = await usersRepository.findByAuthLoginEmail(email)
        const userConfirmationCode = code

        const message = String.raw`
            <h1>Thank for your registration</h1>
        <p>To finish registration please follow the link below:
            <a href="https://somesite.com/confirm-email?code=${code}">complete registration</a>
        </p>`
        const subject = "Код подтверждения регистрации"

        await emailAdapter.sendEmail(email, message, subject)




    }
}
