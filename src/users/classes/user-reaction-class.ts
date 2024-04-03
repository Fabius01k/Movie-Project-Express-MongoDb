
export class UserReaction {
    constructor(
        public id: string,
        public movieId: string,
        public userLogin: string,
        public userId: string,
        public createdAt: Date,
        public reactionStatus: string,
    ) {
    }
}