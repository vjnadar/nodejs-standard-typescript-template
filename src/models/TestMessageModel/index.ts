import { DeleteResult, Document, InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";

import getDatabaseAccess from "../../databaseConnection";
import { throwError } from "../../utilities/errorHandlers";
import { errorTypes } from "../../utilities/errorHandlers/enums";
import { TestMessageDocumentType } from "../types";
class TestMessageModel {
    _id: ObjectId | undefined;
    message: string;
    private static collectionName = "testMessage";
    constructor(_id: ObjectId | undefined, message: string) {
        this._id = _id ? _id : undefined;
        this.message = message;
    }
    async save(): Promise<UpdateResult | InsertOneResult<TestMessageDocumentType>> {
        const database = await getDatabaseAccess();
        if (!this._id) {
            const documentObjectToBeInserted = {
                message: this.message
            };
            const result: InsertOneResult<TestMessageDocumentType> = await database
                .collection(TestMessageModel.collectionName)
                .insertOne(documentObjectToBeInserted);
            throwError({ type: errorTypes.INSERT_ONE }, result);
            return result;
        } else {
            const result: UpdateResult = await database.collection(TestMessageModel.collectionName).updateOne(
                { _id: this._id },
                {
                    $set: this
                }
            );
            throwError({ type: errorTypes.UPDATE_ONE }, result);
            return result;
        }
    }
    static async getTestMessage(messageId: ObjectId): Promise<WithId<Document> | null> {
        const database = await getDatabaseAccess();
        const result: WithId<Document> | null = await database.collection(TestMessageModel.collectionName).findOne({ _id: messageId });
        return result;
    }
    static async deleteTestMessage(messageId: ObjectId) {
        const database = await getDatabaseAccess();
        const result: DeleteResult = await database.collection(TestMessageModel.collectionName).deleteOne({ _id: messageId });
        return result;
    }
}

export default TestMessageModel;
