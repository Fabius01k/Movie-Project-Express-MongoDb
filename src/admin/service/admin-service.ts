import {UserRepository} from "../../users/repository/user-repository";
import {User} from "../../users/classes/user-class";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import add from "date-fns/add";
import {AuthenticationService} from "../../authentication/service/authentication-service";

export class AdminService {
    constructor(protected userRepository: UserRepository,
                protected authenticationService: AuthenticationService) {
    }

    async createUser(name: string, age: string, sex: string, login: string, password: string, email: string): Promise<User | null> {

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
        )

        return await this.userRepository.createUser(newUser)
    }

    async findAllUsers(sortBy: string, sortDirection: 'asc' | 'desc',
                       pageSize: number, pageNumber: number,
                       searchLoginTerm: string | null,
                       searchEmailTerm: string | null,
                       searchNameTerm: string | null,
                       searchAgeTerm: string | null,) {
        return this.userRepository.findAllUsers(sortBy, sortDirection, pageSize, pageNumber,
            searchLoginTerm, searchEmailTerm, searchNameTerm, searchAgeTerm)
    }

    async deleteUser(id: string): Promise<boolean> {
        return await this.userRepository.deleteUser(id)
    }

    async updateBlog(id: string, name: string, age: string, sex: string, login: string, email: string): Promise<boolean> {
        return await this.userRepository.updateUser(id, name, age, sex, login, email)
    }
}