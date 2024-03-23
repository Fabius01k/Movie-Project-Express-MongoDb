import {movieService} from "../../composition-root";
import {MovieService} from "../service/movie-service";
import {Request, Response} from "express";

export class MovieController {
    constructor(
        protected movieService: MovieService,
    ) {
    }

    async getAllMovies(req: Request, res: Response) {

        let searchNameTerm: string | null = req.query.searchNameTerm as any
        if (!searchNameTerm) {
            searchNameTerm = null
        }

        let searchReleaseDateTerm: string | null = req.query.searchAgeTerm as any
        if (!searchReleaseDateTerm) {
            searchReleaseDateTerm = null
        }

        let searchDurationTerm: string | null = req.query.searchLoginTerm as any
        if (!searchDurationTerm) {
            searchDurationTerm = null
        }

        let sortBy: string = req.query.sortBy as any
        if (!sortBy) {
            sortBy = 'createdAt'
        }

        let sortDirection: 'asc' | 'desc' | undefined = req.query.sortDirection as 'asc' | 'desc' | undefined
        if (!sortDirection || sortDirection.toLowerCase() !== 'asc') {
            sortDirection = 'desc'
        }

        let pageSize: number = req.query.pageSize as any
        const checkPagSize = +pageSize

        if (!pageSize || !Number.isInteger(checkPagSize) || checkPagSize <= 0) {
            pageSize = 10
        }

        let pageNumber: number = req.query.pageNumber as any
        const checkPageNumber = +pageNumber

        if (!pageNumber || !Number.isInteger(checkPageNumber) || checkPageNumber <= 0) {
            pageNumber = 1
        }

        const movies = await this.movieService.findAllMovies(sortBy, sortDirection, +pageSize, +pageNumber,
            searchReleaseDateTerm, searchDurationTerm,searchNameTerm,)
        res.status(200).send(movies)
    }
    async getMovieById(req: Request, res: Response) {
        const post = await this.movieService.findMovieById(req.params.id)

        if (post) {
            res.status(200).send(post)
        } else {
            res.sendStatus(404)
        }
    }
}