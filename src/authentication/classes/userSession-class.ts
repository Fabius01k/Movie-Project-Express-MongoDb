export class UserSession {
    constructor(
        public userId: string,
        public ip: string,
        public title: string,
        public deviceId: string,
        public lastActiveDate: string,
        public refreshToken: string,
        public tokenCreationDate: Date,
        public tokenExpirationDate: Date,
    ) {}
}