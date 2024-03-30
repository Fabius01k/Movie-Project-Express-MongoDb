import dotenv from 'dotenv'
import mongoose from 'mongoose';
import {User} from "../users/classes/user-class";
import {userSchema} from "../users/mongoSchemes/user-schema";
import {UserSession} from "../authentication/classes/userSession-class";
import {sessionSchema} from "../authentication/mongoSchemes/userSession-schema";
import {Movie} from "../movies/classes/movie-class";
import {movieSchema} from "../movies/mongoSchemes/movie-schema";
import {Comment} from "../comments/classes/comment-class";
import {commentSchema} from "../comments/mongoSchemes/comment-schema";


dotenv.config()


const dbName = "myApi"
const mongoURI = process.env.MONGO_URL || `mongodb://0.0.0.0:27017/${dbName}`

export const UserModel = mongoose.model<User>("users", userSchema)
export const SessionModel = mongoose.model<UserSession>("sessions", sessionSchema)
export const MovieModel = mongoose.model<Movie>("movies", movieSchema)
export const CommentModel = mongoose.model<Comment>("comment",commentSchema)



export const collections = [UserModel, SessionModel, MovieModel, CommentModel]

export async function runDb() {
    try {
        await mongoose.connect(mongoURI, {dbName: "myApi"})
        console.log('Connected successfully to mongoose server')
    } catch (e) {
        console.log('Can`t connect to db')
        await mongoose.disconnect()
    }
}







