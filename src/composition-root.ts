import {AuthenticationService} from "./authentication/service/authentication-service";
import {AuthenticationController} from "./authentication/controller/authentication-controller";
import {UserRepository} from "./users/repository/user-repository";
import {AdminService} from "./admin/service/admin-service";
import {AdminController} from "./admin/controller/admin-controller";
import {AuthenticationRepository} from "./authentication/repository/authentication-repository";
import {RegistrationController} from "./registration/controller/registration-controller";
import {RegistrationService} from "./registration/service/registration-service";
import {EmailManager} from "./managers/email-manager";


export const userRepository = new UserRepository()
export const emailManager = new EmailManager(userRepository)
export const authenticationRepository = new AuthenticationRepository()
export const authenticationService = new AuthenticationService(userRepository,authenticationRepository)
export const authenticationController = new AuthenticationController(authenticationService)


export const adminService = new AdminService(userRepository,authenticationService)
export const adminController = new AdminController(adminService,)

export const registrationService = new RegistrationService(userRepository,authenticationService,emailManager)
export const registrationController = new RegistrationController(registrationService)


