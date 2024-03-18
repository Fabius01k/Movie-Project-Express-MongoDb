import {Request, Response, Router} from "express";

declare global {
    namespace Express {
        export interface Request {
            userId?: string | null
        }
    }
}