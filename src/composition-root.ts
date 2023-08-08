import {VideosRepository} from "./repositories-db/videos-repositories-db";
import {VideosService} from "./domain/videos-servise";
import {VideosController} from "./routes/videos-router";
import {BlogsRepository} from "./repositories-db/blogs-repository-db";
import {BlogsService} from "./domain/blogs-service";
import {PostsRepostory} from "./repositories-db/post-repostory-db";
import {PostsServise} from "./domain/posts-servise";
import {BlogsController} from "./routes/blogs-router";
import {CommentsRepository} from "./repositories-db/comments-repository-db";
import {CommentsService} from "./domain/comments-service";
import {PostsController} from "./routes/post-router";
import {CommentsController} from "./routes/comment-router";
import {UsersRepository} from "./repositories-db/users-repository-db";
import {UsersService} from "./domain/users-service";
import {UsersController} from "./routes/users-router";
import {SecurityRepository} from "./repositories-db/security-repository-db";
import {SecurityService} from "./domain/security-service";
import {SecurityController} from "./routes/security-router";
import {AuthService} from "./domain/auth-service";
import {AuthController} from "./routes/auth-router";
import {EmailManager} from "./managers/email-manager";


export const videosRepository = new VideosRepository()
export const blogsRepository = new BlogsRepository()
export const postsRepository = new PostsRepostory()
export const commentsRepository = new CommentsRepository()
export const usersRepository = new UsersRepository()
export const securityRepository = new SecurityRepository()

export const emailManager = new EmailManager(usersRepository)

export const videosService = new VideosService(videosRepository)
export const blogsService = new BlogsService(blogsRepository,postsRepository)
export const postsService = new PostsServise(postsRepository,commentsRepository)
export const commentsService = new CommentsService(commentsRepository)
export const usersService = new UsersService(usersRepository)
export const authService = new AuthService(usersRepository,emailManager)
export const securityService = new SecurityService(securityRepository)




export const videosController = new VideosController(videosService)
export const blogsController = new BlogsController(blogsService)
export const postsController = new PostsController(postsService)
export const commentsController = new CommentsController(commentsService)
export const usersController = new UsersController(usersService)
export const authController = new AuthController(usersService,authService)
export const securityController = new SecurityController(securityService)



