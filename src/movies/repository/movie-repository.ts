import {Movie} from "../classes/movie-class";
import {MovieModel, UserModel} from "../../db/db";
import {User} from "../../users/classes/user-class";

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
    async findAllMovies(sortBy: string, sortDirection: 'asc' | 'desc',
                       pageSize: number, pageNumber: number,
                        searchReleaseDateTerm: string | null,
                        searchDurationTerm: string | null,
                       searchNameTerm: string | null,
    ) {

        const filter = {
            $or: [
                {'accountData.login': {$regex: searchReleaseDateTerm ?? '', $options: 'i'}},
                {'accountData.email': {$regex: searchDurationTerm ?? '', $options: 'i'}},
                {'accountData.name': {$regex: searchNameTerm ?? '', $options: 'i'}},
            ]
        }

        const movies: Movie[] = await MovieModel
            .find(filter)
            .sort({sortBy: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()

        const totalCount = await MovieModel.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount / pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: movies
        }
    }
    async findMovieById(id: string): Promise<Movie | null> {
        const movie = await MovieModel.findOne({id: id})
        if(!movie) return null

        return (movie)
    }

}