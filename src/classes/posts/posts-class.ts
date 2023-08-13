import {ObjectId} from "mongodb";


export class ClassPostDb {
    constructor(
    public _id: ObjectId,
    public id: string,
    public title: string,
    public shortDescription: string,
    public content: string,
    public blogId: string,
    public blogName: string,
    public createdAt: string
    ) {}
}