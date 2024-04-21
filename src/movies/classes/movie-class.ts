export class Movie {
    constructor(
        public id: string,
        public createdAt: string,
        public mainData: {
            name: string,
            releaseDate: Date,
            duration: number,
            ageLimit: string,
            releaseCountry: string,
            categories: string[],
            type: string,
        },
        public actorsAndDirectors: {
            actors: string[],
            directors: string[],
        },
        public description: {
            shortDescription: string,
            fullDescription: string,
        },
        public mainPhotoUrl: string,
    ) {}
}