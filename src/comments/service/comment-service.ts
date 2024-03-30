import {MovieRepository} from "../../movies/repository/movie-repository";
import {UserRepository} from "../../users/repository/user-repository";
import {Comment} from "../classes/comment-class";
import {CommentRepository} from "../repository/comment-repository";

export class CommentService {
    constructor(
        protected movieRepository: MovieRepository,
        protected userRepository: UserRepository,
        protected commentRepository: CommentRepository,
    ) {
    }
    async findCommentById(id: string): Promise<Comment | null> {
        return await this.commentRepository.findCommentById(id)
    }
    async createComment(content: string, movieId: string, userId: string): Promise<Comment | null> {

        const movie = await this.movieRepository.findMovieById(movieId)
        if(!movie) {
            return null
        }
        const user = await this.userRepository.findUserById(userId)
        if(!user) {
            return null
        }

        const dateNow = new Date().getTime().toString()

        const newComment = new Comment(
            dateNow,
            content,
            {
                userId: user.id,
                userLogin: user.accountData.login
            },
            new Date().toISOString(),
            movieId
        )

        return await this.commentRepository.createComment(newComment)
    }
    async updateComment(id: string, content: string): Promise<boolean> {

        // const comment = await this.commentRepository.findCommentById(id)
        // if(!comment) {
        //     return null
        // }
        return await this.commentRepository.updateComment(id,content)
    }
    async deleteComment(id: string): Promise<boolean> {
        return await this.commentRepository.deleteComment(id)
    }
}