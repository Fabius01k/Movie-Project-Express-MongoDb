import {Router} from "express";
import {adminController} from "../../composition-root";


export const adminRouter = Router({})

adminRouter.post('/create-user',
    adminController.createUser.bind(adminController))

adminRouter.post('/get-all-users',
    adminController.createUser.bind(adminController))