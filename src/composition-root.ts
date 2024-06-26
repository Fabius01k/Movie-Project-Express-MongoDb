import {AuthenticationService} from "./authentication/service/authentication-service";
import {AuthenticationController} from "./authentication/controller/authentication-controller";
import {UserRepository} from "./users/repository/user-repository";
import {AdminService} from "./admin/service/admin-service";
import {AdminController} from "./admin/controller/admin-controller";
import {AuthenticationRepository} from "./authentication/repository/authentication-repository";
import {RegistrationController} from "./registration/controller/registration-controller";
import {RegistrationService} from "./registration/service/registration-service";
import {EmailManager} from "./managers/email-manager";
import {MovieRepository} from "./movies/repository/movie-repository";
import {MovieService} from "./movies/service/movie-service";
import {MovieController} from "./movies/controller/movie-controller";
import {CommentController} from "./comments/controller/comment-controller";
import {CommentService} from "./comments/service/comment-service";
import {CommentRepository} from "./comments/repository/comment-repository";


export const userRepository = new UserRepository()
export const movieRepository = new MovieRepository()
export const commentRepository = new CommentRepository()
export const emailManager = new EmailManager(userRepository)
export const authenticationRepository = new AuthenticationRepository()
export const authenticationService = new AuthenticationService(userRepository,authenticationRepository)



export const adminService = new AdminService(userRepository,movieRepository,authenticationService,)
export const adminController = new AdminController(adminService,)

export const authenticationController = new AuthenticationController(authenticationService,adminService)

export const registrationService = new RegistrationService(userRepository,movieRepository,authenticationService,emailManager)
export const registrationController = new RegistrationController(registrationService)

export const movieService = new MovieService(movieRepository)
export const movieController = new MovieController(movieService,adminService)

export const commentService = new CommentService(movieRepository,userRepository,commentRepository)
export const commentController = new CommentController(commentService)


