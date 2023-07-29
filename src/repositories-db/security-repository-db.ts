import {

    NewDocumentToAppFromUser,
    UsersSessionDb,
    UsersSessionView
} from "../models/user-account/user-account-types";
import {CommentsRepository} from "./comments-repository-db";
import {userActionLogsCollection, usersAccountCollection, usersAccountTokenColletion} from "../db/db";


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
            const sessions = await usersAccountTokenColletion.find({ sessionId: sessionId }).toArray();
            return sessions.map(mapSessionFromDbtoView);
        },

    async deleteOtherSessionsInDb(sessionId: string,deviceId: string) {
        let result = await usersAccountTokenColletion.deleteMany({ sessionId, deviceId: { $ne: deviceId } });
        return result.deletedCount > 0;
    },

    async deleteSessionByDeviceIdInDb(deviceId: string) {
            let result = await usersAccountTokenColletion.deleteOne({ deviceId });
            return result.deletedCount === 1;
    },
    

    async addDocumentInCollectionDb(documentForCount: NewDocumentToAppFromUser): Promise<NewDocumentToAppFromUser> {
        let result = await userActionLogsCollection
            .insertOne(documentForCount)
        return documentForCount
    },

    // async countDocuments(filter: NewDocumentToAppFromUser): Promise<number> {
    //
    //     const filterCount = {
    //         ip: filter.ip,
    //         url: filter.url,
    //         date: filter.date
    //     }
    //
    //     // const count = await sessionsRepository.countDocuments(filterCount);
    //     // return count
    //
    //     const count = await userActionLogsCollection.countDocuments(filterCount);
    //     return count
    //
    // }

    async countDocumentsInDb(ip: string, url: string, tenSecondsAgo: Date): Promise<number> {
        const count = await userActionLogsCollection.countDocuments({
            ip: ip,
            url: url,
            date: { $gte: tenSecondsAgo }
        });
        return count;
    }


}