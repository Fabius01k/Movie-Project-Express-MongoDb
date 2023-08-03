import {videosModel} from "../db/db";
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
//const valueAvailableResolutions = ["P144", "P240", "P360", "P480", "P720", "P1080", "P1440", "P2160"]
//const valuePublicationDate = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d+)?(Z|[+-]\d{2}:\d{2})$/

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
        const videos: TVideoDb[] = await videosModel.find().lean();
        return videos.map(v => mapVideoFromDbToView(v))
    },

    async createVideo(newVideo: TVideoDb): Promise<TVideoView> {
        await videosModel.insertMany([newVideo]);

        return mapVideoFromDbToView(newVideo);
        },

    async getVideoById(id: number): Promise<TVideoView | null> {
        const video: TVideoDb | null = await videosModel.findOne({id: id})
        if (!video) return null

        return mapVideoFromDbToView(video)
    },

    async updateVideo(id: number, title: string, author: string,
                      availableResolutions: string[], canBeDownloaded: boolean,
                      minAgeRestriction: number | null,
                      publicationDate: string): Promise<boolean> {

        const updateVideo = await videosModel.
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
        const deleteVideo = await videosModel.
        deleteOne({id: id})

        return deleteVideo.deletedCount === 1
    }
}

