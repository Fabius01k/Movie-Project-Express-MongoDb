import mongoose from "mongoose";
import {UserSession} from "../classes/userSession-class";

export const sessionSchema = new mongoose.Schema<UserSession>({
    sessionId: { type: String, require: true },
    ip: { type: String, require: true },
    title: { type: String, require: true },
    deviceId: { type: String, require: true },
    lastActiveDate: { type: String, require: true },
    refreshToken: { type: String, require: true },
    tokenCreationDate: { type: Date, require: true },
    tokenExpirationDate: { type: Date, require: true },
})