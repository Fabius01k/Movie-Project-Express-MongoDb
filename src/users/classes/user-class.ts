export class User {
    constructor(
        public id: string,
        public createdAt: string,
        public accountData: {
            name: string,
            age: string,
            sex: string,
            login: string,
            email: string
        },
        public passwordData: {
            passwordHash: string
            passwordSalt: string
        },
        public emailConfirmationData: {
            confirmationCode: string,
            expirationDate: Date
            isConfirmed: boolean
        },
        public passwordUpdateData: {
            resetPasswordCode: string | null
            expirationDatePasswordCode: Date
        },
        public userTags: string[],
    ) {}
}