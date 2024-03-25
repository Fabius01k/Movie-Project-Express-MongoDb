import {User} from "../classes/user-class";

export interface allUserResponse {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: User[];
}