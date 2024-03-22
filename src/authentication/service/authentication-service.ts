import {User} from "../../users/classes/user-class";
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {UserRepository} from "../../users/repository/user-repository";
import {UserSession} from "../classes/userSession-class";
import {authenticationRepository} from "../../composition-root";
import {AuthenticationRepository} from "../repository/authentication-repository";

export class AuthenticationService {
    constructor(protected userRepository: UserRepository,
                protected authenticationRepository: AuthenticationRepository
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
    async createSession(sessionId: string, ip: string, title: string,deviceId: string, refreshToken: string): Promise<UserSession> {

        const newSession = new UserSession(
            sessionId,
            ip,
            title,
            deviceId,
            new Date().toISOString(),
            refreshToken,
            new Date(),
            new Date(Date.now() + 20000)
        )

        return await this.authenticationRepository.createSession(newSession)
    }
    async deleteSession(deviceId: string): Promise<boolean> {

        return await this.authenticationRepository.deleteSession(deviceId)
    }
    async changeDataInSession(deviceId: string, refreshToken: string): Promise<boolean> {

        return await this.authenticationRepository.changeDataInSession(deviceId,refreshToken)
    }
}