import {Router} from "express";
import {adminController} from "../../composition-root";
import {userAdminCreateUpdateValidator } from "../../validation/user-validation";
import {inputValidationMiddleware} from "../../middlewares/input-validation-middleware";
import {basicAuthorizationMiddleware} from "../../middlewares/basic-authorization-middleware";
import {movieAdminCreateUpdateValidator} from "../../validation/movie-validation";


export const adminRouter = Router({})


adminRouter.get('/users/get-all-users',basicAuthorizationMiddleware,
    adminController.getAllUsers.bind(adminController))

adminRouter.get('/users/:id', basicAuthorizationMiddleware,
    adminController.getUserById.bind(adminController))



adminRouter.post('/users/create-user',basicAuthorizationMiddleware,userAdminCreateUpdateValidator,
    inputValidationMiddleware,
    adminController.createUser.bind(adminController))

adminRouter.post('/movies/create-movie',movieAdminCreateUpdateValidator,inputValidationMiddleware,
    adminController.createMovie.bind(adminController))



adminRouter.put('users/update-user',basicAuthorizationMiddleware,userAdminCreateUpdateValidator,
    inputValidationMiddleware,
    adminController.updateUser.bind(adminController))

adminRouter.put('/movies/update-movie',basicAuthorizationMiddleware,
    adminController.updateMovie.bind(adminController))



adminRouter.delete('/users/delete-user',basicAuthorizationMiddleware,
    adminController.deleteUser.bind(adminController))

adminRouter.delete('/movies/delete-movie',basicAuthorizationMiddleware,
    adminController.deleteMovie.bind(adminController))

