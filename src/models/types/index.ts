import { ObjectId } from "mongodb";

export type TestMessageDocumentType = {
    _id: ObjectId;
    message: string;
};
