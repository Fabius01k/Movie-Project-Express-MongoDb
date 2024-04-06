import {UserRepository} from "../../users/repository/user-repository";
import {User} from "./../../users/classes/user-class";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";
import {AuthenticationService} from "../../authentication/service/authentication-service";
import {Movie} from "../../movies/classes/movie-class";
import {movieRepository} from "../../composition-root";
import {MovieRepository} from "../../movies/repository/movie-repository";
import {allUserResponse} from "../../users/interfaces/gel-all-users-interface";

export class AdminService {
    constructor(protected userRepository: UserRepository,
                protected movieRepository: MovieRepository,
                protected authenticationService: AuthenticationService) {
    }

    async createUser(name: string, age: string, sex: string, login: string, password: string, email: string): Promise<User> {

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await this.authenticationService.generateHash(password, passwordSalt)

        const dateNow = new Date().getTime().toString()

        const newUser = new User(
            dateNow,
            new Date().toISOString(),
            {
                name: name,
                age: age,
                sex: sex,
                login: login,
                email: email
            },
            {
                passwordHash,
                passwordSalt,
            },
            {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date(), {
                    hours: 1
                }),
                isConfirmed: true
            },
            {
                resetPasswordCode: null,
                expirationDatePasswordCode: new Date()
            },
            [],
        )

        return await this.userRepository.createUser(newUser)
    }
    async createMovie(name: string, releaseDate: string, duration: string,
                      ageLimit: string, releaseCountry: string, categories: string[],
                      actors: string[], directors: string[], shortDescription: string,
                      fullDescription: string,mainPhotoUrl: string): Promise<Movie> {
        console.log("start2")
        const dateNow = new Date().getTime().toString()

        const newMovie = new Movie(
            dateNow,
            new Date().toISOString(),
            {
                name: name,
                releaseDate: releaseDate,
                duration: duration,
                ageLimit: ageLimit,
                releaseCountry: releaseCountry,
                categories: categories,
            },
            {
                actors: actors,
                directors: directors,
            },
            {
                shortDescription: shortDescription,
                fullDescription: fullDescription,
            },
            mainPhotoUrl
        )
        console.log("start3")
        return await this.movieRepository.createMovie(newMovie)
    }

    async findAllUsers(sortBy: string, sortDirection: 'asc' | 'desc',
                       pageSize: number, pageNumber: number,
                       searchLoginTerm: string | null,
                       searchEmailTerm: string | null,
                       searchNameTerm: string | null,
                       searchAgeTerm: string | null): Promise<allUserResponse> {
        return await this.userRepository.findAllUsers(sortBy, sortDirection, pageSize, pageNumber,
            searchLoginTerm, searchEmailTerm, searchNameTerm, searchAgeTerm)
    }
    async findUserById(id: string): Promise<User | null> {
        return await this.userRepository.findUserById(id)
    }
    async deleteUser(id: string): Promise<boolean> {
        return await this.userRepository.deleteUser(id)
    }
    async deleteMovie(id: string): Promise<boolean> {
        return await this.movieRepository.deleteMovie(id)
    }

    async updateUser(id: string, name: string, age: string, sex: string, login: string, email: string): Promise<boolean> {
        return await this.userRepository.updateUser(id, name, age, sex, login, email)
    }
    async updateMovie(id: string, name: string, releaseDate: string, duration: string,
                      ageLimit: string, releaseCountry: string, categories: string[],
                      actors: string[], directors: string[], shortDescription: string,
                      fullDescription: string,mainPhotoUrl: string
                      ): Promise<boolean> {
        return await this.movieRepository.updateMovie(id, name, releaseDate, duration, ageLimit, releaseCountry,
            categories,actors,directors,shortDescription,fullDescription,mainPhotoUrl)
    }
}