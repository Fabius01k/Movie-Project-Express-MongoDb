import {UserModel} from "../../db/db";
import {User} from "../classes/user-class";

export class UserRepository {
    async findUserForCheckCredentials(loginOrEmail: string) {
        const user: User | null = await UserModel.findOne({$or: [{"accountData.email": loginOrEmail}, {"accountData.login": loginOrEmail}]})
        return user
    }
    async createUser(newUser: User): Promise<User | null> {
        const insertedUsers = await UserModel.insertMany([newUser]);
        const user = insertedUsers[0] as User
        return user || null
    }
    async findAllUsers(sortBy: string, sortDirection: 'asc' | 'desc',
                    pageSize: number, pageNumber: number,
                    searchLoginTerm: string | null,
                    searchEmailTerm: string | null,
                    searchNameTerm: string | null,
                    searchAgeTerm: string | null
    ) {

        const filter = {
            $or: [
                {'accountData.login': {$regex: searchLoginTerm ?? '', $options: 'i'}},
                {'accountData.email': {$regex: searchEmailTerm ?? '', $options: 'i'}},
                {'accountData.name': {$regex: searchNameTerm ?? '', $options: 'i'}},
                {'accountData.age': {$regex: searchAgeTerm ?? '', $options: 'i'}},
            ]
        }

        const users: User[] = await UserModel
            .find(filter)
            .sort({sortBy: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean()

        const totalCount = await UserModel.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount / pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: users
        }
    }

}