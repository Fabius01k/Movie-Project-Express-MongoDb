import {TUserDb, TUserView} from "../models/users/users-type";
import {usersRepository} from "../repositories-db/users-repository-db";
import {ObjectId, WithId} from "mongodb";
import bcrypt from "bcrypt";
import {TUserAccountDb} from "../models/user-account/user-account-types";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";

export let users: TUserAccountDb[] = []

const mapUserFromDbView = (user: TUserAccountDb): TUserView => {
    return {
        id: user.id,
        login: user.accountData.userName.login,
        email: user.accountData.userName.email,
        createdAt: user.accountData.createdAt
    }
}

export const usersService = {

    async findUsers(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number,searchLoginTerm: string | null,
                    searchEmailTerm: string | null) {
        return usersRepository.findUsers(sortBy,sortDirection,pageSize,pageNumber,searchLoginTerm,searchEmailTerm)
    },

    async findUserById(id: string): Promise<TUserView | null> {
        return usersRepository.getUserById(id)
    },

    async findAuthUser(userId: string): Promise<TUserView | null> {
        return usersRepository.findAuthUser(userId)
    },

    async createUser(login: string, password: string, email: string): Promise<TUserView | null > {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const dateNow = new Date().getTime().toString()

        const newUser: TUserAccountDb = {

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
                    isConfirmed: true
                }

        }

        const createdUserService = await usersRepository.createUser(newUser)

        return createdUserService
    },

    async deleteUser(id: string): Promise<boolean> {
        return await usersRepository.deleteUser(id)
    },

    async _generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

    async checkCredentials(loginOrEmail: string, password: string) : Promise<WithId<TUserAccountDb> | null> {
        const user = await usersRepository.findByAuthLoginEmail(loginOrEmail)
        console.log(user, "check")
        if(!user) return null

        // if (!user.emailConfirmation.isConfirmed) {
        //     return null
        // }

        if(user && await bcrypt.compare(password,user.accountData.passwordHash)) return user
       // const passwordHash = await this._generateHash(password, user.passwordSalt)
        return null
    },


}

