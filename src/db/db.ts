import {TVideo} from "../models/videos/videos-type";
import {TVposts} from "../models/posts/posts-type";
import {TVblogs} from "../models/blogs/blogs-type";

export let db = {
    videos: [],
    blogs: [],
    posts: []
}


let videos: TVideo[] = []
let postst: TVposts[] = []
let blogs: TVblogs[] = []


