import {TUserView} from "../models/users/users-type";
import {usersAccountCollection, usersAccountTokenColletion} from "../db/db";
import {TokensOfUserDb, TUserAccountDb} from "../models/user-account/user-account-types";


export let users: TUserAccountDb[] = []
const mapUserFromDbView = (user: TUserAccountDb): TUserView => {
    return {
        id: user.id,
        login: user.accountData.userName.login,
        email: user.accountData.userName.email,
        createdAt: user.accountData.createdAt
    }
}

export const usersRepository = {

    async findUsers(sortBy: string, sortDirection: 'asc' | 'desc',
                    pageSize: number, pageNumber: number,
                    searchLoginTerm: string | null,
                    searchEmailTerm: string | null) {

        console.log(searchLoginTerm, searchEmailTerm)
        const filter = {
            $or: [
                {'accountData.userName.login': {$regex: searchLoginTerm ?? '', $options: 'i'}},
                {'accountData.userName.email': {$regex: searchEmailTerm ?? '', $options: 'i'}},
            ]
        }

        /*const filters: FilterQuery<UserDatabaseType>[] = [];

        if (pagination.searchEmailTerm) {
            filters.push(
                {
                    email: { $regex: pagination.searchEmailTerm, $options: 'i' }
                }
            )
        }

        if (pagination.searchLoginTerm) {
            filters.push(
                {
                    login: { $regex: pagination.searchLoginTerm, $options: 'i' }
                }
            )
        }

        const filter: FilterQuery<UserDatabaseType> = {};

        if (filters.length > 0) {
            filter.$or = filters;
        }*/

        const users: TUserAccountDb[] = await usersAccountCollection
            .find(filter)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()

        console.log('users', users)
        const items = users.map(u => mapUserFromDbView(u))
        const totalCount = await usersAccountCollection.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount / pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: items
        }

    },

    async findAuthUser(id: string): Promise<TUserView | null> {
        const authUser: TUserAccountDb | null = await usersAccountCollection.findOne({id: id})
        if (!authUser) return null

        return mapUserFromDbView(authUser)
    },

    async getUserById(id: string): Promise<TUserView | null> {
        const user: TUserAccountDb | null = await usersAccountCollection.findOne({id: id})
        if (!user) return null

        return mapUserFromDbView(user)
    },

    async createUser(newUser: TUserAccountDb): Promise<TUserView | null> {
        await usersAccountCollection.insertOne(newUser)

        return mapUserFromDbView(newUser)
    },

    async createUserAccount(userAccount: TUserAccountDb): Promise<TUserAccountDb | null> {
        await usersAccountCollection.insertOne(userAccount)
        return userAccount
    },

    async deleteUser(id: string): Promise<boolean> {
        const deleteUser = await usersAccountCollection
            .deleteOne({id: id})

        return deleteUser.deletedCount === 1
    },

    // async findByLoginEmail(loginOrEmail: string) {
    //
    //     const user = await usersAccountCollection.findOne({ $or: [{ email:loginOrEmail}, { login: loginOrEmail} ]})
    //     return user
    // },

    async findByAuthLoginEmail(loginOrEmail: string) {

        const user = await usersAccountCollection.findOne({$or: [{"accountData.userName.email": loginOrEmail}, {"accountData.userName.login": loginOrEmail}]})
        console.log(user, "findBy")
        return user
    },

    async findUserByConfirmCode(emailConfirmationCode: string) {

        const user = await usersAccountCollection.findOne({"emailConfirmation.confirmationCode": emailConfirmationCode})
        console.log(user, "findBy")
        return user
    },

    async findUserById(id: string) {
        const user = await usersAccountCollection.findOne({id: id})
        return user
    },


    async updateConfirmation(id: string) {
        let result = await usersAccountCollection
            .updateOne({id}, {$set: {'emailConfirmation.isConfirmed': true}})
        console.log(result, "confirmation finally")
        return result.modifiedCount === 1
    },

    async chengConfirmationCode(id: string, confirmationCode: string) {
        let result = await usersAccountCollection
            .updateOne({id}, {$set: {'emailConfirmation.confirmationCode': confirmationCode}})

        return result.modifiedCount === 1
    },

    async saveTokenInDb(tokenUser: TokensOfUserDb): Promise<TokensOfUserDb> {
        let result = await usersAccountTokenColletion
            .insertOne(tokenUser)
        return tokenUser
    },

    async changeTokenInDb(userId: string, refreshToken: string) {
        let result = await usersAccountTokenColletion
            .updateOne({userId}, {$set: {refreshToken: refreshToken}})

        return result.modifiedCount === 1
    },

    async makeTokenIncorrectDb(userId: string) {
        let result = await usersAccountTokenColletion.updateOne({userId}, {$unset: {refreshToken: ""}})
        return result.modifiedCount === 1;
    },
}

