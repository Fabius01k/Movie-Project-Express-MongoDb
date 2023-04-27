import {TVideoDb, TVideoView} from "../models/videos/videos-type";
import {videosCollection} from "../db/db";
import {ObjectId} from "mongodb";
import {videosRepository} from "../repositories-db/videos-repositories-db";


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


export const videosService = {

    async findVideos(): Promise<TVideoView[]> {
        return videosRepository.findVideos()
    },

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

        const createdVideoService = await videosRepository.createVideo(newVideo)

        return createdVideoService;

    },

    async getVideoById(id: number): Promise<TVideoView | null> {
        return videosRepository.getVideoById(id)
    },

    async updateVideo(id: number, title: string, author: string,
                      availableResolutions: string[], canBeDownloaded: boolean,
                      minAgeRestriction: number | null,
                      publicationDate: string): Promise<boolean> {
        return await videosRepository.updateVideo(id,title,author,availableResolutions,
            canBeDownloaded,minAgeRestriction,publicationDate)
    },

    async deleteVideo(id: number): Promise<boolean> {
        return await videosRepository.deleteVideo(id)
    }
}
