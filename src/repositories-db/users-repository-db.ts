import {TUserDb, TUserView} from "../models/users/users-type";
import {usersCollection} from "../db/db";


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
        console.log(pageNumber);
        console.log(pageSize);


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

    async createUser(newUser: TUserDb): Promise<TUserView | null> {

        await usersCollection.insertOne(newUser)

        return mapUserFromDbView(newUser)
    },

    async deleteUser(id: string): Promise<boolean> {
        const deleteUser = await usersCollection
            .deleteOne({id: id})

        return deleteUser.deletedCount === 1
    },

    async findByLoginEmail(loginOrEmail: string) {

        const user = await usersCollection.findOne({ $or: [{ email:loginOrEmail}, {userName: loginOrEmail} ]})
        return user
    }
}