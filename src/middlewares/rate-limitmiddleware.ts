import {NextFunction, Request, Response} from "express";
import {securityServise} from "../domain/security-servide";
import {userActionLogsCollection} from "../db/db";
import {sessionsRepository} from "../repositories-db/security-repository-db";


export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const ip = req.ip
    const url = req.url
    const date = new Date()
    const tenSecondsAgo = new Date(date.getTime() - 10000);

    await securityServise.addDocumentInCollection(ip,url,date)

    const count: number = await securityServise.getDocumentCount(ip, url, tenSecondsAgo);

    if (count > 5) return res.sendStatus(429);

    next()
}