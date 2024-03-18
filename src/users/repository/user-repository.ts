import {UserModel} from "../../db/db";
import {User} from "../classes/user-class";

export class UserRepository {
    async findUserForCheckCredentials(loginOrEmail: string) {
        const user: User | null = await UserModel.findOne({$or: [{"accountData.email": loginOrEmail}, {"accountData.login": loginOrEmail}]})
        return user
    }

}