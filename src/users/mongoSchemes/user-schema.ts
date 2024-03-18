import {User} from "../classes/user-class";
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema<User>({
    id: {type: String, require: true},
    createdAt: {type: String, require: true},

    accountData: {
            name: {type: String, require: true},
            age: {type: String, require: true},
            sex: {type: String, require: true},
            login: {type: String, require: true},
            email: {type: String, require: true},
    },
    passwordData: {
        passwordHash: {type: String, require: true},
        passwordSalt: {type: String, require: true},
    },
    emailConfirmationData: {
        confirmationCode: {type: String, require: true},
        expirationDate: {type: Date, require: true},
        isConfirmed: {type: Boolean, require: true},
    },
    passwordUpdateData: {
        resetPasswordCode: {type: String, default: null},
        expirationDatePasswordCode: {type: Date, default: null},
    },
})