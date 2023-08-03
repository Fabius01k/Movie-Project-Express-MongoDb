import {WithId} from "mongodb";
import {UsersSessionDb} from "../../models/user-account/user-account-types";
import mongoose from "mongoose";


export const sessionsSchema = new mongoose.Schema<WithId<UsersSessionDb>>({
    sessionId: { type: String, require: true },
    ip: { type: String, require: true },
    title: { type: String, require: true },
    deviceId: { type: String, require: true },
    lastActiveDate: { type: String, require: true },
    refreshToken: { type: String, require: true },
    tokenCreationDate: { type: Date, require: true },
    tokenExpirationDate: { type: Date, require: true },
})