import {User} from "../../users/classes/user-class";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {UserRepository} from "../../users/repository/user-repository";

export class AuthenticationService {
    constructor(protected userRepository: UserRepository
    ) {}

    // async findUsers(sortBy: string,sortDirection: 'asc' | 'desc',
    //                 pageSize: number,pageNumber: number,searchLoginTerm: string | null,
    //                 searchEmailTerm: string | null) {
    //     return this.usersRepository.findUsers(sortBy,sortDirection,pageSize,pageNumber,searchLoginTerm,searchEmailTerm)
    // }
    // async findUserById(id: string): Promise<TUserView | null> {
    //     return this.usersRepository.getUserById(id)
    // }
    // async findAuthUser(userId: string): Promise<TUserView | null> {
    //     return this.usersRepository.findAuthUser(userId)
    // }
    // async createUser(login: string, password: string, email: string): Promise<TUserView | null > {
    //
    //     const passwordSalt = await bcrypt.genSalt(10)
    //     const passwordHash = await this._generateHash(password, passwordSalt)
    //
    //     const dateNow = new Date().getTime().toString()
    //
    //     const newUser = new ClassUserAccountDb(
    //
    //         new ObjectId(),
    //         dateNow,
    //         {
    //             userName: {
    //                 login: login,
    //                 email: email
    //             },
    //             passwordHash,
    //             passwordSalt,
    //             createdAt: new Date().toISOString(),
    //         },
    //         {
    //             confirmationCode: uuidv4(),
    //             expirationDate: add(new Date(), {
    //                 hours: 1
    //             }),
    //             isConfirmed: true
    //         },
    //         {
    //             resetPasswordCode: null,
    //             expirationDatePasswordCode: new Date()
    //         },
    //     )
    //
    //     const createdUserService = await this.usersRepository.createUser(newUser)
    //
    //     return createdUserService
    // }
    // async deleteUser(id: string): Promise<boolean> {
    //     return await this.usersRepository.deleteUser(id)
    // }
    // async _generateHash(password: string, salt: string) {
    //     const hash = await bcrypt.hash(password, salt)
    //     return hash
    // }
    async checkCredentials(loginOrEmail: string, password: string) : Promise<User | null> {
        const user = await this.userRepository.findUserForCheckCredentials(loginOrEmail)

        if(!user) return null

        if(user && await bcrypt.compare(password,user.passwordData.passwordHash)) return user
        return null
    }
}