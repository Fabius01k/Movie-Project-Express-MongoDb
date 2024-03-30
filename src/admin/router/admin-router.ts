import {Router} from "express";
import {adminController} from "../../composition-root";
import {userAdminCreateUpdateValidator } from "../../validation/user-validation";
import {inputValidationMiddleware} from "../../middlewares/input-validation-middleware";
import {basicAuthorizationMiddleware} from "../../middlewares/basic-authorization-middleware";


export const adminRouter = Router({})

adminRouter.get('/get-all-users',basicAuthorizationMiddleware,
    adminController.getAllUsers.bind(adminController))

adminRouter.get('/:id', basicAuthorizationMiddleware,
    adminController.getUserById.bind(adminController))


adminRouter.post('/create-user',basicAuthorizationMiddleware,userAdminCreateUpdateValidator,
    inputValidationMiddleware,
    adminController.createUser.bind(adminController))

adminRouter.post('/create-movie',basicAuthorizationMiddleware,
    adminController.createMovie.bind(adminController))



adminRouter.put('update-user',basicAuthorizationMiddleware,userAdminCreateUpdateValidator,
    inputValidationMiddleware,
    adminController.updateUser.bind(adminController))

adminRouter.put('update-movie',basicAuthorizationMiddleware,
    adminController.updateMovie.bind(adminController))



adminRouter.delete('delete-user',basicAuthorizationMiddleware,
    adminController.deleteUser.bind(adminController))

adminRouter.delete('delete-movie',basicAuthorizationMiddleware,
    adminController.deleteMovie.bind(adminController))

