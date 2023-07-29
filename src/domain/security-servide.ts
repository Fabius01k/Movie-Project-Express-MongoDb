import {sessionsRepository} from "../repositories-db/security-repository-db";
import { NewDocumentToAppFromUser, UsersSessionView} from "../models/user-account/user-account-types";
import {userActionLogsCollection} from "../db/db";


export const securityServise = {
    async getUserSessions(sessionId: string): Promise<UsersSessionView[]> {

        return sessionsRepository.getUserSessions(sessionId)
    },

    async deleteOtherSessions(sessionId: string, deviceId: string): Promise<boolean> {

        let result = await sessionsRepository.deleteOtherSessionsInDb(sessionId,deviceId)
        return result
       },

    async deleteSessionByDeviceId(deviceId: string): Promise<boolean> {

        let result = await sessionsRepository.deleteSessionByDeviceIdInDb(deviceId)
        return result
    },

    // async addDocumentInCollection(ip: string, url: string, date: Date): Promise<newDocument> {
    //
    //     const documentForCount: newDocument = {
    //         ip: ip,
    //         url: url,
    //         date: date
    //     }
    //
    //     let result = await sessionsRepository.addDocumentInCollection(documentForCount)
    //     return result
    // },

    async addDocumentInCollection(ip: string, url: string, date: Date): Promise<NewDocumentToAppFromUser> {

        const documentForCount: NewDocumentToAppFromUser = {
            ip: ip,
            url: url,
            date: date
        }

        let result: NewDocumentToAppFromUser = await sessionsRepository.addDocumentInCollectionDb(documentForCount)
        return result
    },

    // async getDocumentCount(ip: string, url: string, tenSecondsAgo: Date): Promise<number> {
    //     const filter: NewDocumentToAppFromUser = {
    //         ip: ip,
    //         url: url,
    //         date: tenSecondsAgo
    //     }
    //
    //     const filterCount = {
    //         ip: filter.ip,
    //         url: filter.url,
    //         date: typeof filter.date === 'object' ? filter.date : { $gte: filter.date }
    //     }
    //
    //     let result: number = await sessionsRepository.countDocuments(filterCount)
    //     return result
    //
    //     // const count = await userActionLogsCollection.countDocuments(filter);
    //     // return count
    // }
    async getDocumentCount(ip: string, url: string, date: Date): Promise<number> {
        const count = await sessionsRepository.countDocumentsInDb(ip, url, date);
        return count;
    }

}