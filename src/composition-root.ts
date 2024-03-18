import {AuthenticationService} from "./authentication/service/authentication-service";
import {AuthenticationController} from "./authentication/controller/authentication-controller";
import {UserRepository} from "./users/repository/user-repository";


export const userRepository = new UserRepository()
export const authenticationService = new AuthenticationService(userRepository)
export const authenticationController = new AuthenticationController(authenticationService)



