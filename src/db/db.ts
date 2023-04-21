import {TVideo} from "../models/videos/videos-type";
import {TVposts} from "../models/posts/posts-type";
import {TVblogs} from "../models/blogs/blogs-type";
import {MongoClient} from "mongodb";
import dotenv from 'dotenv'

dotenv.config()
const mongoURI = process.env.MONGO_URL || 'mongodb://0.0.0.0:27017'

export const client = new MongoClient(mongoURI)

export async function runDb() {
    try {
        await client.connect();
        await client.db("Bloggers_DB").command({ping: 1});
        console.log("Conncted successfully to mogo server")
    } catch {
        console.log("Can`t connect to db");
        await client.close();
    }
}

export const blogsCollection = client.db("myApi").collection("blogs")
export const postsCollection = client.db("myApi").collection("posts")
export const videosCollection = client.db("myApi").collection("videos")

export let db = {
    videos: [],
    blogs: [],
    posts: []
}


let videos: TVideo[] = []
let postst: TVposts[] = []
let blogs: TVblogs[] = []


