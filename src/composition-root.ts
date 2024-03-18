import {AuthenticationService} from "./authentication/service/authentication-service";
import {AuthenticationController} from "./authentication/controller/authentication-controller";
import {UserRepository} from "./users/repository/user-repository";
import {AdminService} from "./admin/service/admin-service";
import {AdminController} from "./admin/controller/admin-controller";


export const userRepository = new UserRepository()
export const authenticationService = new AuthenticationService(userRepository)
export const authenticationController = new AuthenticationController(authenticationService)


export const adminService = new AdminService(userRepository,authenticationService)
export const adminController = new AdminController(adminService,)