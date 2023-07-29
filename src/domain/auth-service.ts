import { TUserAccountDb, UsersSessionDb} from "../models/user-account/user-account-types";
import bcrypt from "bcrypt";
import {ObjectId} from "mongodb";
import add from 'date-fns/add'
import {usersRepository} from "../repositories-db/users-repository-db";
import {emailManager} from "../managers/email-manager";
import {randomUUID} from "crypto";
import {usersAccountCollection} from "../db/db";

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
                confirmationCode: randomUUID(),
                expirationDate: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: false
            }
        }


        const createUserAuth = await usersRepository.createUserAccount(userAccount)


        emailManager.sendEmailconfirmationMessage(userAccount)

        return createUserAuth
    },

    async createSession(sessionId: string, ip: string, title: string,deviceId: string, refreshToken: string): Promise<UsersSessionDb> {

        const userSession: UsersSessionDb = {

            sessionId: sessionId,
            ip: ip,
            title: title,
            deviceId: deviceId,
            lastActiveDate: new Date().toISOString(),
            refreshToken: refreshToken,
            tokenCreationDate: new Date(),
            tokenExpirationDate: new Date(Date.now() + 20000)
        }

        let result = await usersRepository.createSessionInDb(userSession)
        return result
    },

    async changeDataInSession(deviceId: string, refreshToken: string): Promise<boolean> {

        let result = await usersRepository.changeDataInSessionInDb(deviceId,refreshToken)
        return result
    },
    // async addTokenToBlackList(userForResend: string, token: string): Promise<boolean> {
    //
    //     let result = await usersRepository.addTokenInBlackListDb(userForResend,token)
    //     return result
    // },

    // async makeTokenIncorrect(deviceId: string,refreshToken: string): Promise<boolean> {
    //
    //     let result = await usersRepository.makeTokenIncorrectDb(deviceId,refreshToken)
    //     return result
    // },

    async deleteSession(deviceId: string): Promise<boolean> {

        let result = await usersRepository.deleteSessionInDb(deviceId)
        return result
    },

    async confirmEmail(code: string): Promise<boolean> {

        let user = await usersRepository.findUserByConfirmCode(code)

        console.log({code})
        console.log(user, "found user - service")
        console.log(await usersAccountCollection.find().toArray(), "found users - service")

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false
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

        if (!user) return false
        if (user.emailConfirmation.isConfirmed) return false

        const confirmationCode = randomUUID()

        await usersRepository.chengConfirmationCode(user.id,confirmationCode)

        emailManager.resendEmailconfirmationMessage(email, confirmationCode)

        return true

    }
}




