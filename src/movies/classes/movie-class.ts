export class Movie {
    constructor(
        public id: string,
        public createdAt: string,
        public mainData: {
            name: string,
            releaseDate: string,
            duration: string,
            ageLimit: string,
            releaseCountry: string,
            categories: string[],
        },
        public actorsAndDirectors: {
            actors: string[],
            directors: string[],
        },
        public description: {
            shortDescription: string,
            fullDescription: string,
        },
    ) {}
}