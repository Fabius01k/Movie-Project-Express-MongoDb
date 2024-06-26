import {Movie} from "../classes/movie-class";
import {MovieModel, UserReactionModel, WatchListModel} from "../../db/db";
import {allMovieResponse} from "../interfaces/gel-all-movies-interface";
import {UserReaction} from "../../users/classes/user-reaction-class";
import {WatchList} from "../classes/watch-list-class";

export class MovieRepository {
    async createMovie(newMovie: Movie): Promise<Movie> {
        await MovieModel.insertMany([newMovie]);
        return newMovie
    }
    async createWatchList(newWatchList: WatchList): Promise<void> {
        await WatchListModel.insertMany([newWatchList]);
    }
    async updateMovie(id: string, name: string, releaseDate: string, duration: string,
                      ageLimit: string, releaseCountry: string, categories: string[],type: string,
                      actors: string[], directors: string[], shortDescription: string,
                      fullDescription: string,mainPhotoUrl: string): Promise<boolean> {
        const updateMovie = await MovieModel
            .updateOne({id: id}, {
                $set: {
                    name: name,
                    releaseDate: releaseDate,
                    duration: duration,
                    ageLimit: ageLimit,
                    releaseCountry: releaseCountry,
                    categories: categories,
                    type: type,
                    actors: actors,
                    directors: directors,
                    shortDescription: shortDescription,
                    fullDescription: fullDescription,
                    mainPhotoUrl: mainPhotoUrl,
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
    ): Promise<allMovieResponse> {

        const filter = {
            $or: [
                {'mainData.releaseDate': {$regex: searchReleaseDateTerm ?? '', $options: 'i'}},
                {'mainData.duration': {$regex: searchDurationTerm ?? '', $options: 'i'}},
                {'mainData.name': {$regex: searchNameTerm ?? '', $options: 'i'}},
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
    async findMainPageMovies() {
        const moviesWithLikes = await UserReactionModel.aggregate([
            { $match: { reactionStatus: 'Like' } },
            { $group: { _id: '$movieId', totalLikes: { $sum: 1 } } },
            { $sort: { totalLikes: -1 } }
        ]);

        const movieIds = moviesWithLikes.map(movie => movie._id);
        const moviesWithBestRating = await MovieModel.find({ id: { $in: movieIds } });

        const newMovies = await MovieModel.find({ 'mainData.releaseDate': '2024' });
        const recommendedMovies = await MovieModel.find();

        return(moviesWithBestRating)
    }
    async findMovieById(id: string): Promise<Movie | null> {
        console.log(id)
        const movie = await MovieModel.findOne({id: id})
        if(!movie) return null

        return (movie)
    }
    async findCurrentReaction(userId: string, movieId: string): Promise<void> {
        const currentReaction: UserReaction | null = await UserReactionModel.findOne({userId, movieId})
        if (currentReaction) {
            await UserReactionModel.deleteOne({id: currentReaction.id})
        }
    }
    async createUserReaction(newReaction: UserReaction): Promise<boolean> {
        await UserReactionModel.insertMany([newReaction]);
        return true
    }

    async addMovieToWatchList(userId: string, movieId: string): Promise<boolean> {
        await WatchListModel.findOneAndUpdate(
            { userId: userId },
            { $addToSet: { movieId: movieId } },
            { new: true, upsert: true }
        )

        return true
    }

    async removeMovieFromWatchList(userId: string, movieId: string): Promise<boolean> {
        await WatchListModel.findOneAndUpdate(
            { userId },
            { $pull: { movieId: movieId } },
            { new: true }
        );

        return true
    }
}