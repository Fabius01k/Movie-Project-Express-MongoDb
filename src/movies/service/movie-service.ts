import {MovieRepository} from "../repository/movie-repository";
import {Movie} from "../classes/movie-class";
import {allMovieResponse} from "../interfaces/gel-all-movies-interface";
import {UserReaction} from "../../users/classes/user-reaction-class";

export class MovieService {
    constructor(protected movieRepository: MovieRepository,) {}

    async findAllMovies(sortBy: string, sortDirection: 'asc' | 'desc',
                       pageSize: number, pageNumber: number,
                        searchReleaseDateTerm: string | null,
                        searchDurationTerm: string | null,
                       searchNameTerm: string | null): Promise<allMovieResponse> {
        return await this.movieRepository.findAllMovies(sortBy, sortDirection, pageSize, pageNumber,
            searchReleaseDateTerm, searchDurationTerm, searchNameTerm)
    }
    async findMovieById(id: string): Promise<Movie | null> {
        console.log(id)
        return await this.movieRepository.findMovieById(id)
    }

    async createUserReaction(userId: string,userLogin: string,movieId: string,likeStatus: string): Promise<boolean> {
        await this.movieRepository.findCurrentReaction(userId,movieId)
        const dateNow = new Date().getTime().toString()

        const newReaction = new UserReaction(
            dateNow,
            movieId,
            userLogin,
            userId,
            new Date(),
            likeStatus
        )
        await this.movieRepository.createUserReaction(newReaction)
        return true
    }
}