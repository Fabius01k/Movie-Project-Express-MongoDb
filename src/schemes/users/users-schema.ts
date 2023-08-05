import {ObjectId, WithId} from "mongodb";
import {TUserAccountDb} from "../../models/user-account/user-account-types";
import mongoose from "mongoose";


export const usersSchema = new mongoose.Schema<WithId<TUserAccountDb>>({
    _id: {type: ObjectId, require: true},
    id: {type: String, require: true},
    accountData: {
        userName: {
            login: {type: String, require: true},
            email: {type: String, require: true},
        },
        passwordHash: {type: String, require: true},
        passwordSalt: {type: String, require: true},
        createdAt: {type: String, require: true},
    },
    emailConfirmation: {
        confirmationCode: {type: String, require: true},
        expirationDate: {type: Date, require: true},
        isConfirmed: {type: Boolean, require: true},
    },
    resetPasswordCode: {type: String, default: null},
    expirationDatePasswordCode: {type: Date, default: null},
})