import {Movie} from "../classes/movie-class";

export interface allMovieResponse {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Movie[];
}