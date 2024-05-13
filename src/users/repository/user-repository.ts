import {UserModel} from "../../db/db";
import {allUserResponse} from "../interfaces/gel-all-users-interface";
import {User} from "../classes/user-class";

const mapUserForViewModel = (user: User): User => {
    return {
         id: user.id,
         createdAt: user.createdAt,
         accountData: {
            name: user.accountData.name,
            age: user.accountData.age,
            sex: user.accountData.sex,
            login: user.accountData.login,
            email: user.accountData.email
    },
 passwordData: {
        passwordHash: user.passwordData.passwordHash,
        passwordSalt: user.passwordData.passwordSalt
    },
 emailConfirmationData: {
        confirmationCode: user.emailConfirmationData.confirmationCode,
        expirationDate: user.emailConfirmationData.expirationDate,
        isConfirmed: user.emailConfirmationData.isConfirmed
    },
 passwordUpdateData: {
        resetPasswordCode: user.passwordUpdateData.resetPasswordCode,
        expirationDatePasswordCode: user.passwordUpdateData.expirationDatePasswordCode
    },
 userTags: user.userTags,
    }
}

export class UserRepository {
    async findUserForCheckCredentials(loginOrEmail: string) {
        const user: User | null = await UserModel.findOne({$or: [{"accountData.email": loginOrEmail}, {"accountData.login": loginOrEmail}]})
        return user
    }
    async createUser(newUser: User): Promise<User> {
        await UserModel.insertMany([newUser]);
        return newUser
    }

    async findAllUsers(sortBy: string, sortDirection: 'asc' | 'desc',
                    pageSize: number, pageNumber: number,
                    searchLoginTerm: string | null,
                    searchEmailTerm: string | null,
                    searchNameTerm: string | null,
                    searchAgeTerm: string | null
    ): Promise<allUserResponse> {

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

        const items = users.map(u => mapUserForViewModel(u))
        const totalCount = await UserModel.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount / pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: items
        }
    }
    async findUserById(id: string): Promise<User | null> {
        const user = await UserModel.findOne({id: id})
        if(!user) return null

        return mapUserForViewModel(user)
    }
    async deleteUser(id: string): Promise<boolean> {
        const deleteUser = await UserModel
            .deleteOne({id: id})

        return deleteUser.deletedCount === 1
    }
    async updateUser(id: string, name: string,age: string, sex: string, login: string,email: string): Promise<boolean> {
        const updateUser = await UserModel
            .updateOne({id: id}, {
            $set: {
                'accountData.name': name,
                'accountData.age': age,
                'accountData.sex': sex,
                'accountData.login': login,
                'accountData.email': email,
            },
        })

        return updateUser.matchedCount === 1
    }
    async findUserByConfirmationCode(emailConfirmationCode: string) {

        const user: User | null = await UserModel.findOne({"emailConfirmationData.confirmationCode": emailConfirmationCode})
        return user
    }
    async findUserByLoginOrEmail(loginOrEmail: string) {

        const user: User | null = await UserModel.findOne({$or: [{"accountData.email": loginOrEmail}, {"accountData.login": loginOrEmail}]})
        return user
    }
    async findUserByResetPasswordCode(recoveryCode: string) {
        const user: User | null = await UserModel.findOne({"passwordUpdateData.resetPasswordCode": recoveryCode})
        return user
    }
    async updateConfirmation(id: string): Promise<boolean> {
        let result = await UserModel
            .updateOne({id}, {$set: {'emailConfirmationData.isConfirmed': true}})

        return result.modifiedCount === 1
    }
    async changeConfirmationCode(id: string, confirmationCode: string): Promise<boolean> {
        let result = await UserModel
            .updateOne({id}, {$set: {'emailConfirmationData.confirmationCode': confirmationCode}})

        return result.modifiedCount === 1
    }
    async changePasswordInDb(id: string, passwordSalt: string, passwordHash: string): Promise<boolean> {
        let result = await UserModel
            .updateOne({id}, {
                $set: {
                    'passwordData.passwordSalt': passwordSalt,
                    'passwordData.passwordHash': passwordHash
                }
            })

        return result.modifiedCount === 1
    }
    async changeResetPasswordCode(id: string, NewResetPasswordCode: string,
                                  NewExpirationDatePasswordCode: Date): Promise<boolean> {
        let result = await UserModel
            .updateOne({id}, {
                $set: {
                    'passwordUpdateData.resetPasswordCode': NewResetPasswordCode,
                    'passwordUpdateData.expirationDatePasswordCode': NewExpirationDatePasswordCode
                }
            })

        return result.modifiedCount === 1
    }

}