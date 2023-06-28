import {TUserAccountDb} from "../models/user-account/user-account-types";
import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from 'uuid'
import add from 'date-fns/add'
import {usersRepository} from "../repositories-db/users-repository-db";
import {emailManager} from "../managers/email-manager";

export const authService = {
    async createUserAuth(login: string, password: string, email: string): Promise<TUserAccountDb | null> {

        const dateNow = new Date().getTime().toString()
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)
        const userAccount: TUserAccountDb = {

            _id: new ObjectId(),
            id: dateNow,
            accountData: {
                userName: {
                    login: login,
                    email: email
                },
                passwordHash,
                passwordSalt,
                createdAt: new Date().toISOString(),
            },
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: false
            }
        }
        console.log(userAccount, "userAccount final")

        const createUserAuth = usersRepository.createUserAccount(userAccount)
        console.log(createUserAuth, "result of createUserAuth")

        await emailManager.sendEmailconfirmationMessage(userAccount)

        return createUserAuth
    },

    async confirmEmail(code: string, email: string): Promise<boolean> {

        let user = await usersRepository.findByAuthLoginEmail(email)

        if (!user) return false
        if (user.emailConfirmation.confirmationCode !== code) return false
        if (user.emailConfirmation.expirationDate < new Date()) return false


            let result = await usersRepository.updateConfirmation(user.id)
            return result
        },


    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

    async resendingCode(email: string): Promise<boolean | null> {

        let user = await usersRepository.findByAuthLoginEmail(email)
        console.log(user,"found user for resending - service")

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false

        const newConfirmationCode = uuidv4()
        console.log(newConfirmationCode, "do new code - servce")

        let result = await usersRepository.chengConfirmationCode(user.id,newConfirmationCode)
        console.log("code was cheng")
        // user.emailConfirmation.confirmationCode = newСonfirmationCode

        const code = user.emailConfirmation.confirmationCode

        await emailManager.resendEmailconfirmationMessage(email, code)

        return true

    }
}
// if (user.emailConfirmation.isConfirmed) return false



