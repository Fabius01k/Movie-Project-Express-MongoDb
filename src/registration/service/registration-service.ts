import {UserRepository} from "../../users/repository/user-repository";
import {User} from "../../users/classes/user-class";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";
import bcrypt from "bcrypt";
import {AuthenticationService} from "../../authentication/service/authentication-service";
import {EmailManager} from "../../managers/email-manager";
import {randomUUID} from "crypto";
export class RegistrationService {
    constructor(protected userRepository: UserRepository,
                protected authenticationService: AuthenticationService,
                protected emailManager: EmailManager) {
    }

    async registrationUser(name: string, age: string, sex: string,login: string, password: string, email: string): Promise<User | null> {

        const dateNow = new Date().getTime().toString()
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this.authenticationService.generateHash(password, passwordSalt)

        const newUser = new User(
            dateNow,
            new Date().toISOString(),
            {
                name: name,
                age: age,
                sex: sex,
                login: login,
                email: email
            },
            {
                passwordHash,
                passwordSalt,
            },
            {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: false
            },
            {
                resetPasswordCode: null,
                expirationDatePasswordCode: new Date()
            },
        )

        const createdUser = await this.userRepository.createUser(newUser)

        await this.emailManager.sendEmailConfirmationMessage(newUser)

        return createdUser
    }
    async confirmationEmail(code: string): Promise<boolean> {

        const user = await this.userRepository.findUserByConfirmationCode(code)

        if (!user) return false
        if (user.emailConfirmationData.isConfirmed) return false
        if (user.emailConfirmationData.confirmationCode !== code) return false
        if (user.emailConfirmationData.expirationDate < new Date()) return false

        return await this.userRepository.updateConfirmation(user.id)
    }
    async resendingCode(email: string): Promise<boolean> {

        const user = await this.userRepository.findUserByLoginOrEmail(email)

        if (!user) return false
        if (user.emailConfirmationData.isConfirmed) return false

        const confirmationCode = randomUUID()

        await this.userRepository.changeConfirmationCode(user.id,confirmationCode)

        await this.emailManager.resendEmailConfirmationMessage(email, confirmationCode)
        return true
    }
    async makeNewPassword(newPassword: string, recoveryCode: string): Promise<boolean> {

        const user = await this.userRepository.findUserByResetPasswordCode(recoveryCode)
        if (!user) return false
        if (user.passwordUpdateData.expirationDatePasswordCode < new Date()) return false

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this.authenticationService.generateHash(newPassword, passwordSalt)

        return this.userRepository.changePasswordInDb(user.id,passwordSalt,passwordHash)
    }
    async resendingPasswordCode(email: string): Promise<boolean | null> {

        let user = await this.userRepository.findUserByLoginOrEmail(email)
        if (!user) return false

        const NewResetPasswordCode = randomUUID()
        const NewExpirationDatePasswordCode = add(new Date(), { hours: 24 });
        await this.userRepository.changeResetPasswordCode(user.id,NewResetPasswordCode,NewExpirationDatePasswordCode)

        await this.emailManager.resendPasswordCodeMessage(email,NewResetPasswordCode)

        return true
    }
}