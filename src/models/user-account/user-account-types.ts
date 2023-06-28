import {ObjectId} from "mongodb";

export type TUserAccountDb = {
    _id?: ObjectId
    id: string
    accountData: {
        userName: {
            login: string,
            email: string
        },
        passwordHash: string
        passwordSalt: string
        createdAt: string
    },
    emailConfirmation: {
        confirmationCode: string,
        expirationDate: Date
        isConfirmed: boolean
    }
}
