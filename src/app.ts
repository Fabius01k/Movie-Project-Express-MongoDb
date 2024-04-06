import express, {Request, Response} from "express";
import cookieParser from "cookie-parser"
import {authenticationRouter} from "./authentication/router/authentication-router";
import {adminRouter} from "./admin/router/admin-router";
import {registrationRouter} from "./registration/router/registration-router";
import {movieRouter} from "./movies/router/movie-router";


const app = express()
app.use(cookieParser())
app.use(express.json())


app.use('/authentication', authenticationRouter)
app.use('/admin', adminRouter)
app.use('/auth', registrationRouter)
app.use('/movie', movieRouter)
export default app