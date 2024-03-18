import express, {Request, Response} from "express";
import cookieParser from "cookie-parser";
import {collections} from "./db/db";
import {authenticationRouter} from "./authentication/router/authentication-router";


const app = express()
app.use(cookieParser())
app.use(express.json())


app.use('/authentication', authenticationRouter)
export default app