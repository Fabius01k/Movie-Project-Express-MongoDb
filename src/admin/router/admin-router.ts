import {Router} from "express";
import {adminController} from "../../composition-root";


export const adminRouter = Router({})

adminRouter.post('/create-user',
    adminController.createUser.bind(adminController))

adminRouter.get('/get-all-users',
    adminController.getAllUsers.bind(adminController))

adminRouter.delete('delete-user',
    adminController.deleteUser.bind(adminController))

adminRouter.put('update-user',
    adminController.deleteUser.bind(adminController))