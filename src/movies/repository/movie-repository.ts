import {Movie} from "../classes/movie-class";
import {MovieModel} from "../../db/db";

export class MovieRepository {
    async createMovie(newMovie: Movie): Promise<Movie> {
        await MovieModel.insertMany([newMovie]);
        return newMovie
    }
    async updateMovie(id: string, name: string, releaseDate: string, duration: string,
                      ageLimit: string, releaseCountry: string, categories: string[],
                      actors: string[], directors: string[], shortDescription: string,
                      fullDescription: string): Promise<boolean> {
        const updateMovie = await MovieModel
            .updateOne({id: id}, {
                $set: {
                    name: name,
                    releaseDate: releaseDate,
                    duration: duration,
                    ageLimit: ageLimit,
                    releaseCountry: releaseCountry,
                    categories: categories,
                    actors: actors,
                    directors: directors,
                    shortDescription: shortDescription,
                    fullDescription: fullDescription,
                },
            })

        return updateMovie.matchedCount === 1
    }
    async deleteMovie(id: string): Promise<boolean> {
        const deleteUser = await MovieModel
            .deleteOne({id: id})

        return deleteUser.deletedCount === 1
    }

}