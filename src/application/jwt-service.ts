import {TUserDb} from "../models/users/users-type";
import * as jwt from 'jsonwebtoken'
import {settings} from "./settings";
import {ObjectId} from "mongodb";
import {TUserAccountDb} from "../models/user-account/user-account-types";


export const jwtService = {

    async createJWT(user: TUserAccountDb) {
        const token = jwt.sign({userId: user.id}, settings.JWT_SECRET, {expiresIn: '1h'})
        return token
    },

    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
    },
}

