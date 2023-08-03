import {MongoClient} from "mongodb";
import dotenv from 'dotenv'
import {TBlogDb} from "../models/blogs/blogs-type";
import {TVideoDb} from "../models/videos/videos-type";
import {TPostDb} from "../models/posts/posts-type";
import {TcommentDb} from "../models/comments/comments-type";
import {NewDocumentToAppFromUser, TUserAccountDb, UsersSessionDb} from "../models/user-account/user-account-types";
import mongoose from 'mongoose';
import {videosSchema} from "../schemes/videos/videos-schema";
import {blogsSchema} from "../schemes/blogs/blogs-schema";
import {postsSchema} from "../schemes/posts/posts-schema";
import {commentSchema} from "../schemes/comments/comments-schema";
import {usersSchema} from "../schemes/users/users-schema";
import {sessionsSchema} from "../schemes/sessions/sessions-schema";
import {accessingToAppSchema} from "../schemes/accessingToApp/accessingtoapp_schema";

dotenv.config()


const dbName = "myApi"
const mongoURI = process.env.MONGO_URL || `mongodb://0.0.0.0:27017/${dbName}`

// export const client = new MongoClient(mongoURI)
// export const db = client.db(dbName)
export const videosModel = mongoose.model<TVideoDb>("videos", videosSchema)
export const blogsModel = mongoose.model<TBlogDb>("blogs", blogsSchema)
export const postsModel = mongoose.model<TPostDb>("posts",postsSchema)
export const commentsModel = mongoose.model<TcommentDb>("comments",commentSchema)
export const userModel = mongoose.model<TUserAccountDb>("user", usersSchema)
export const sessionsModel = mongoose.model<UsersSessionDb>("sessions",sessionsSchema)
export const accessingToAppModel =
    mongoose.model<NewDocumentToAppFromUser>("accessingToApp",accessingToAppSchema)


export const collections = [videosModel,blogsModel,
    postsModel,commentSchema,usersSchema,
    sessionsModel,accessingToAppSchema
]





// export const blogsCollection = db.collection<TBlogDb>("blogs")
// export const postsCollection = db.collection<TPostDb>("posts")
// export const videosCollection = db.collection<TVideoDb>("videos")
// export const commentsCollection = db.collection<TcommentDb>("comments")
// export const usersAccountCollection = db.collection<TUserAccountDb>("accountuser")
// export const usersAccountTokenColletion = db.collection<UsersSessionDb>("sessions")
// export const userActionLogsCollection = db.collection<NewDocumentToAppFromUser>("contactsToApp")


// export const collections = [blogsCollection, postsCollection, videosCollection,
//    commentsCollection,usersAccountCollection, usersAccountTokenColletion, userActionLogsCollection]


export async function runDb() {
    try {
        await mongoose.connect(mongoURI, {dbName: "myApi"})
        console.log('Connected successfully to mongoose server')
    } catch (e) {
        console.log('Can`t connect to db')
        await mongoose.disconnect()
    }
}


// export async function runDb() {
//     try {
//         await client.connect();
//         await db.command({ping: 1});
//         console.log("Conncted successfully to mogo server")
//     } catch {
//         console.log("Can`t connect to db");
//         await client.close();
//     }
// }






