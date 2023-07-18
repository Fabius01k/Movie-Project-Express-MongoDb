import {TUserDb} from "../models/users/users-type";
import * as jwt from 'jsonwebtoken'
import {settings} from "./settings";
import {ObjectId} from "mongodb";
import {TUserAccountDb} from "../models/user-account/user-account-types";


export const jwtService = {

     createAccessJWT(userId: string) {
        const token = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: '10s'})
        return token
    },

    createRefreshJWT(userId: string) {
        const token1 = jwt.sign({userId}, settings.JWT_SECRET, {expiresIn: '20s'})
        return token1
    },



    getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, settings.JWT_SECRET)
            console.log(result)
            return result.userId
        } catch (error) {
            return null
        }
    },
}

