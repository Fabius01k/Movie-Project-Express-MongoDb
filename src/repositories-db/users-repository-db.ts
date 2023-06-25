import {TUserDb, TUserView} from "../models/users/users-type";
import {usersAccountCollection, usersCollection} from "../db/db";
import {TUserAccountDb} from "../models/user-account/user-account-types";
import {ObjectId} from "mongodb";


export let users: TUserDb[] = []
const mapUserFromDbView = (user: TUserDb): TUserView => {
    return {
        id: user.id,
        login: user.login,
        email: user.email,
        createdAt: user.createdAt
    }
}

export const usersRepository = {

    async findUsers(sortBy: string,sortDirection: 'asc' | 'desc',
                    pageSize: number,pageNumber: number,
                    searchLoginTerm: string | null,
                    searchEmailTerm: string | null) {


        const filter = {
                $or: [
                    { login: { $regex: searchLoginTerm ?? '', $options: 'i' } },
                    { email: { $regex: searchEmailTerm ?? '', $options: 'i' } },
                ]}

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

        const users: TUserDb[] = await usersCollection
                    .find(filter)
                    .sort(sortBy,sortDirection)
                    .skip((pageNumber - 1) * pageSize)
                    .limit(pageSize)
                    .toArray()


        const items = users.map(u => mapUserFromDbView(u))
        const totalCount = await usersCollection.countDocuments(filter)

        return {
            pagesCount: Math.ceil(totalCount/pageSize),
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: totalCount,
            items: items
        }

        },

    async findAuthUser(id: string): Promise<TUserView | null> {
        const authUser: TUserDb | null = await usersCollection.findOne({id: id})
        if(!authUser) return null

        return mapUserFromDbView(authUser)
    },

    async getUserById(id: string): Promise<TUserView | null> {
        const user: TUserDb | null = await usersCollection.findOne({id: id})
        if(!user) return null

        return mapUserFromDbView(user)
    },

    async createUser(newUser: TUserDb): Promise<TUserView | null> {

        await usersCollection.insertOne(newUser)

        return mapUserFromDbView(newUser)
    },

    async createUserAccount(userAccount: TUserAccountDb): Promise<TUserAccountDb | null> {
        await usersAccountCollection.insertOne(userAccount)
        return userAccount
    },

    async deleteUser(id: string): Promise<boolean> {
        const deleteUser = await usersCollection
            .deleteOne({id: id})

        return deleteUser.deletedCount === 1
    },

    async findByLoginEmail(loginOrEmail: string) {

        const user = await usersCollection.findOne({ $or: [{ email:loginOrEmail}, { login: loginOrEmail} ]})
        return user
    },

    async findByAuthLoginEmail(loginOrEmail: string) {

        const user = await usersAccountCollection.findOne({ $or: [{ email:loginOrEmail}, { login: loginOrEmail} ]})
        return user
    },

    async upateConfirmation(_id: ObjectId) {
        let result = await usersAccountCollection
            .updateOne({_id}, {$set: {'emailConfirmation.isConfirmed': true}})
        return result.modifiedCount === 1
    }
}

