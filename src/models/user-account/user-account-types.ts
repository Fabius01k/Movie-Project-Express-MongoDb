import {ObjectId} from "mongodb";

export type TUserAccountDb = {
    _id: ObjectId
    accountData: {
        userName: {
            login: string,
            email: string
        },
        passwordHash: string
        createdAt: string
    },
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: Date
        isConfirmed: boolean
    }
}
