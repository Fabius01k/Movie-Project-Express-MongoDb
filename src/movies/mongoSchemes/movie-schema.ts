import mongoose from "mongoose";
import {Movie} from "../classes/movie-class";

export const movieSchema = new mongoose.Schema<Movie>({
    id: { type: String, required: true },
    createdAt: { type: String, required: true },
    mainData: {
        name: { type: String, required: true },
        releaseDate: { type: Date, required: true },
        duration: { type: Number, required: true },
        ageLimit: { type: String, required: true },
        releaseCountry: { type: String, required: true },
        categories: { type: [String], required: true },
        type: { type: String, required: true },
    },
    actorsAndDirectors: {
        actors: { type: [String], required: true },
        directors: { type: [String], required: true },
    },
    description: {
        shortDescription: { type: String, required: true },
        fullDescription: { type: String, required: true },
    },
})

