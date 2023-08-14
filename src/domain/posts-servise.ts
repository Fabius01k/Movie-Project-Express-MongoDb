import {TPostView} from "../models/posts/posts-type";
import {ObjectId} from "mongodb";
import {PostsRepostory} from "../repositories-db/post-repostory-db";
import {CommentsRepository} from "../repositories-db/comments-repository-db";
import {TcommentView} from "../models/comments/comments-type";
import {blogsModel, postsModel, userModel} from "../db/db";
import {ClassPostDb} from "../classes/posts/posts-class";
import {ClassCommentDb, ClassCommentsLikesInfoDb} from "../classes/comments/comments-class";

export let posts: ClassPostDb[] = []

export class PostsService {
    constructor(
        protected postsRepository: PostsRepostory,
        protected commentsRepository: CommentsRepository
    ) {}

    async findPosts(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number) {
        return this.postsRepository.findPosts(
            sortBy,sortDirection,pageSize,pageNumber
        )
    }
    async findCommentByPostID(sortBy: string,sortDirection: 'asc' | 'desc',
                              pageSize: number,pageNumber: number, postId: string, userId: string | null) {
        return this.commentsRepository.findCommentByPostID(sortBy,sortDirection,pageSize,pageNumber,
            postId, userId)
    }
    async createPost(title: string, shortDescription: string, content: string,
                     blogId: string): Promise<TPostView | null> {

        const dateNow = new Date().getTime().toString()
        const blog = await blogsModel.findOne({id: blogId})

        if (!blog) {
            return null
        }

        const newPost = new ClassPostDb(
            new ObjectId(),
            dateNow,
            title,
            shortDescription,
            content,
            blogId,
            blog.name,
            new Date().toISOString(),

        )
        const createdPostService = await this.postsRepository.createPost(newPost)

        return createdPostService
    }
    async createCommentByPostId(content: string, postId: string,userId: string): Promise<TcommentView | null> {

        const dateNow = new Date().getTime().toString()

        const post = await postsModel.findOne({id: postId})
        if(!post) {
            return null
        }

        const user = await userModel.findOne({id: userId})
        if(!user) {

            return null
        }

        const newComment = new ClassCommentDb(
            new ObjectId(),
            dateNow,
            content,
            {
                userId: user.id,
                userLogin: user.accountData.userName.login
            },
            new Date().toISOString(),
            postId
        )

        const infoId = newComment.id
        const newCollectionCommentsLikesInfo = new ClassCommentsLikesInfoDb(
            infoId,
            [],
            0,
            0
        )

        await this.commentsRepository.createCollectionOfCommentsLikesInf(newCollectionCommentsLikesInfo)

        const createdCommentService = await this.commentsRepository.createCommentByPostId(newComment)

        return createdCommentService
    }
    async getPostById(id: string): Promise<TPostView | null> {
        return this.postsRepository.getPostById(id)
    }
    async updatePost(id: string, title: string, shortDescription: string, content: string,
                     blogId: string): Promise<boolean | null> {
        return await this.postsRepository.updatePost(id,title,shortDescription,content,blogId)
    }
    async deletePost(id: string): Promise<boolean> {
        return await this.postsRepository.deletePost(id)
    }
}
