import {

    NewDocumentToAppFromUser,
    UsersSessionDb,
    UsersSessionView
} from "../models/user-account/user-account-types";
import {CommentsRepository} from "./comments-repository-db";
import {
    accessingToAppModel, sessionsModel

} from "../db/db";


export let sessions: UsersSessionDb[] = []

const mapSessionFromDbtoView = (session: UsersSessionDb): UsersSessionView => {
    return {
        ip: session.ip,
        title: session.title,
        lastActiveDate: session.lastActiveDate,
        deviceId: session.deviceId
    }
}


export const sessionsRepository = {

        async getUserSessions(sessionId: string): Promise<UsersSessionView[]> {
            const sessions = await sessionsModel.find({ sessionId: sessionId }).lean();
            return sessions.map(mapSessionFromDbtoView);
        },

    async deleteOtherSessionsInDb(sessionId: string,deviceId: string) {
        let result = await sessionsModel.deleteMany({ sessionId, deviceId: { $ne: deviceId } });
        return result.deletedCount > 0;
    },

    async deleteSessionByDeviceIdInDb(deviceId: string) {
            let result = await sessionsModel.deleteOne({ deviceId });
            return result.deletedCount === 1;
    },
    
    async addDocumentInCollectionDb(documentForCount: NewDocumentToAppFromUser): Promise<NewDocumentToAppFromUser> {
        let result = await accessingToAppModel
            .insertMany([documentForCount])
        return documentForCount
    },

    async countDocumentsInDb(ip: string, url: string, tenSecondsAgo: Date): Promise<number> {
        const count = await accessingToAppModel.countDocuments({
            ip: ip,
            url: url,
            date: { $gte: tenSecondsAgo }
        });
        return count;
    }


}