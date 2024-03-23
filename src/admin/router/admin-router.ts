import {Router} from "express";
import {adminController} from "../../composition-root";
import {movieRouter} from "../../movies/router/movie-router";


export const adminRouter = Router({})

adminRouter.get('/get-all-users',
    adminController.getAllUsers.bind(adminController))

adminRouter.get('/:id', adminController.getUserById.bind(adminController))


adminRouter.post('/create-user',
    adminController.createUser.bind(adminController))

adminRouter.post('/create-movie',
    adminController.createMovie.bind(adminController))



adminRouter.put('update-user',
    adminController.updateUser.bind(adminController))

adminRouter.put('update-movie',
    adminController.updateMovie.bind(adminController))



adminRouter.delete('delete-user',
    adminController.deleteUser.bind(adminController))

adminRouter.delete('delete-movie',
    adminController.deleteMovie.bind(adminController))

