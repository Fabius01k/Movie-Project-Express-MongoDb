import {client, videosCollection} from "../db/db";
import {TVideoDb, TVideoView} from "../models/videos/videos-type";
import {ObjectId} from "mongodb";

type TVideo = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: string[]
}
const valueAvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
const valuePublicationDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/

export let videos: TVideo[] = []

const mapVideoFromDbToView = (video:TVideoDb): TVideoView => {
    return {
        id: video.id,
        title: video.title,
        author: video.author,
        canBeDownloaded: video.canBeDownloaded,
        minAgeRestriction: video.minAgeRestriction,
        createdAt: video.createdAt,
        publicationDate: video.publicationDate,
        availableResolutions: video.availableResolutions
    }
}


export const videosRepository = {

    async findVideos(): Promise<TVideoView[]> {
        const videos: TVideoDb[] = await videosCollection.find().toArray();
        return videos.map(v => mapVideoFromDbToView(v))
    },

    // async findVideos(): Promise<TVideo[]>  {
    //     const videosCollection = client.db("myApi").collection<TVideo>("videos")
    //     const videos = videosCollection.find().toArray();
    //     return videos
    // },

    async createVideo(title: string, author: string, availableResolutions: string[]): Promise<TVideoView> {

        const dateNow = new Date()
        const newVideo: TVideoDb = {
            _id: new ObjectId(),
            id: +dateNow,
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: dateNow.toISOString(),
            publicationDate: new Date(+dateNow + (1000 * 60 * 60 * 24)).toISOString(),
            availableResolutions: availableResolutions
        }

        await videosCollection.insertOne(newVideo);

        return mapVideoFromDbToView(newVideo);

    },

    async getVideoById(id: number): Promise<TVideoView | null> {
        const video: TVideoDb | null = await videosCollection.findOne({id: id})
        if (!video) return null

        return mapVideoFromDbToView(video)
    },

    async updateVideo(id: number, title: string, author: string,
                      availableResolutions: string[], canBeDownloaded: boolean,
                      minAgeRestriction: number | null,
                      publicationDate: string): Promise<boolean> {

        const updateVideo = await videosCollection.
        updateOne({id: id}, {
            $set: {
                title: title,
                author: author,
                availableResolutions: availableResolutions,
                canBeDownloaded: canBeDownloaded,
                minAgeRestriction: minAgeRestriction,
                publicationDate: publicationDate,
            },
        })

        const video = updateVideo.matchedCount === 1
        return video
    },

    async deleteVideo(id: number): Promise<boolean> {
        const deleteVideo = await videosCollection.
        deleteOne({id: id})

        return deleteVideo.deletedCount === 1
    }
}

