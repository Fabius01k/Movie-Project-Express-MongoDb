import {Router} from "express";
import {movieController} from "../../composition-root";

export const movieRouter = Router({})

movieRouter.get('/get-all-movies',
    movieController.getAllMovies.bind(movieController))

movieRouter.get('/:movieId', movieController.getMovieById.bind(movieController))


movieRouter.post('/:movieId/reaction', movieController.createUserReaction.bind(movieController))