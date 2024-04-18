import {Router} from "express";
import {movieController} from "../../composition-root";
import {jwtTokenValidator} from "../../middlewares/jwt-authorization-middleware";

export const movieRouter = Router({})

movieRouter.get('/get-all-movies',
    movieController.getAllMovies.bind(movieController))

movieRouter.get('/main-page-movie',
    movieController.getMainPageMovies.bind(movieController))

movieRouter.get('/:id', movieController.getMovieById.bind(movieController))


movieRouter.post('/:id/reaction',jwtTokenValidator,
    movieController.createUserReaction.bind(movieController))


movieRouter.put('/:id/add-to-watch-list',jwtTokenValidator,
    movieController.addMovieToWatchList.bind(movieController))

movieRouter.put('/:id/remote-from-watch-list',jwtTokenValidator,
    movieController.removeMovieFromWatchList.bind(movieController))

