export class UserSession {
    constructor(
        public sessionId: string,
        public ip: string,
        public title: string,
        public deviceId: string,
        public lastActiveDate: string,
        public refreshToken: string,
        public tokenCreationDate: Date,
        public tokenExpirationDate: Date,
    ) {}
}