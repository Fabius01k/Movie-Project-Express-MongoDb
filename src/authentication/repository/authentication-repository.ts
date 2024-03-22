import {UserSession} from "../classes/userSession-class";
import {SessionModel} from "../../db/db";

export class AuthenticationRepository {
    async createSession(userSession: UserSession): Promise<UserSession> {
        let result = await SessionModel
            .insertMany([userSession])
        return userSession
    }
    async deleteSession(deviceId: string) {
        let result = await SessionModel.deleteOne({deviceId});
        return result.deletedCount === 1;
    }
    async changeDataInSession(deviceId: string, refreshToken: string) {
        let result = await SessionModel
            .updateOne({deviceId}, {
                $set: {
                    refreshToken: refreshToken,
                    lastActiveDate: new Date().toISOString(),
                    tokenCreationDate: new Date(),
                    tokenExpirationDate: new Date(Date.now() + 20000)
                }
            })

        return result.modifiedCount === 1
    }
}