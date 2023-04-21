import {client, videosCollection} from "../db/db";

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


export const videosRepository = {

    async findVideos() {
        const videos = await videosCollection.find().toArray();
        return videos
    },

    // async findVideos(): Promise<TVideo[]>  {
    //     const videosCollection = client.db("myApi").collection<TVideo>("videos")
    //     const videos = videosCollection.find().toArray();
    //     return videos
    // },

    async createVideo(title: string, author: string, availableResolutions: string[]) {

        console.log('createVideo');
        const dateNow = new Date()
        const newVideo: TVideo = {
            id: +dateNow,
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: dateNow.toISOString(),
            publicationDate: new Date(+dateNow + (1000 * 60 * 60 * 24)).toISOString(),
            availableResolutions: availableResolutions
        }

        const createdVideoPromise = await videosCollection.insertOne(newVideo);

        return createdVideoPromise;

    },

    async getVideoById(id: number) {
        const video = await videosCollection.findOne({id: id})

        return video
    },

    async updateVideo(id: number, title: string, author: string,
                      availableResolutions: string[], canBeDownloaded: boolean,
                      minAgeRestriction: number | null,
                      publicationDate: string) {

        const updateVideoPromise = await videosCollection.
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

        const video = updateVideoPromise.matchedCount === 1
        return video
    },

    async deleteVideo(id: number) {
        const deleteVideoPromise = await videosCollection.
        deleteOne({id: id})

        return deleteVideoPromise.deletedCount === 1
    }
}

