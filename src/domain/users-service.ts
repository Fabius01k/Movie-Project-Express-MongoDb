import {TUserDb, TUserView} from "../models/users/users-type";
import {usersRepository} from "../repositories-db/users-repository-db";
import {ObjectId} from "mongodb";
import bcrypt from "bcrypt";

export let users: TUserDb[] = []

const mapUserFromDbView = (user: TUserDb): TUserView => {
    return {
        id: user.id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    }
}

export const usersService = {

    async findUsers(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number,searchLoginTerm: string | null,
                    searchEmailTerm: string | null) {
        return usersRepository.findUsers(sortBy,sortDirection,pageSize,pageNumber,searchLoginTerm,searchEmailTerm)
    },


    async createUser(login: string, password: string, email: string): Promise<TUserView | null > {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this._generateHash(password, passwordSalt)

        const dateNow = new Date().getTime().toString()
        const newUser: TUserDb = {
            _id: new ObjectId(),
            id: dateNow,
            login: login,
            email: email,
            passwordHash,
            passwordSalt,
            createdAt: new Date().toISOString(),
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

    async checkCredentials(loginOrEmail: string, password: string) {
        const user = await usersRepository.findByLoginEmail(loginOrEmail)
        if(!user) return false
       // const passwordHash = await this._generateHash(password, user.passwordSalt)
        return bcrypt.compare(password,user.passwordHash)
    }
}

