import {MongoClient} from "mongodb";
import dotenv from 'dotenv'
import {TBlogDb} from "../models/blogs/blogs-type";
import {TVideoDb} from "../models/videos/videos-type";
import {TPostDb} from "../models/posts/posts-type";

dotenv.config()
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'

export const client = new MongoClient(mongoURI)

const dbName = "myApi"
export const db = client.db(dbName)

export const blogsCollection = db.collection<TBlogDb>("blogs")
export const postsCollection = db.collection<TPostDb>("posts")
export const videosCollection = db.collection<TVideoDb>("videos")


export const collections = [blogsCollection, postsCollection, videosCollection]

export async function runDb() {
    try {
        await client.connect();
        await db.command({ping: 1});
        console.log("Conncted successfully to mogo server")
    } catch {
        console.log("Can`t connect to db");
        await client.close();
    }
}






