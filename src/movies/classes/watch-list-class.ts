export class WatchList {
    constructor(
        public id: string,
        public userId: string,
        public movieId: string[],
    ) {}
}