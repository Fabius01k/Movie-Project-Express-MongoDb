import mongoose from "mongoose";
import {WithId} from "mongodb";
import {NewDocumentToAppFromUser} from "../../models/user-account/user-account-types";


export const accessingToAppSchema = new mongoose.Schema<WithId<NewDocumentToAppFromUser>>({
    ip: { type: String, require: true },
    url: { type: String, require: true },
    date: { type: Date, require: true },
})
