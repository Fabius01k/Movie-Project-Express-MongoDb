import {User} from "../../users/classes/user-class";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {UserRepository} from "../../users/repository/user-repository";

export class AuthenticationService {
    constructor(protected userRepository: UserRepository
    ) {}
    async checkCredentials(loginOrEmail: string, password: string) : Promise<User | null> {
        const user = await this.userRepository.findUserForCheckCredentials(loginOrEmail)

        if(!user) return null

        if(user && await bcrypt.compare(password,user.passwordData.passwordHash)) return user
        return null
    }
    async generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    }
}