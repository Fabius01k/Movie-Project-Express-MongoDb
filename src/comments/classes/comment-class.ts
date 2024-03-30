export class Comment {
    constructor(
        public id: string,
        public content: string,
        public commentatorInfo: {
            userId: string,
            userLogin: string
        },
        public createdAt: string,
        public movieId : string,
    ) {}
}