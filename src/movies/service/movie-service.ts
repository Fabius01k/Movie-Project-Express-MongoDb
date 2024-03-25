import {MovieRepository} from "../repository/movie-repository";
import {Movie} from "../classes/movie-class";
import {allMovieResponse} from "../interfaces/gel-all-movies-interface";

export class MovieService {
    constructor(protected movieRepository: MovieRepository,) {}

    async findAllMovies(sortBy: string, sortDirection: 'asc' | 'desc',
                       pageSize: number, pageNumber: number,
                        searchReleaseDateTerm: string | null,
                        searchDurationTerm: string | null,
                       searchNameTerm: string | null): Promise<allMovieResponse> {
        return this.movieRepository.findAllMovies(sortBy, sortDirection, pageSize, pageNumber,
            searchReleaseDateTerm, searchDurationTerm, searchNameTerm)
    }
    async findMovieById(id: string): Promise<Movie | null> {
        return this.movieRepository.findMovieById(id)
    }
}