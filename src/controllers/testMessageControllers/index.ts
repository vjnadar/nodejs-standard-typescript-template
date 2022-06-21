import { NextFunction, Request, Response } from "express";
import { DeleteResult, Document, InsertOneResult, ObjectId, UpdateResult, WithId } from "mongodb";

import TestMessageModel from "../../models/TestMessageModel";
import { TestMessageDocumentType } from "../../models/types";
import { throwError } from "../../utilities/errorHandlers";
import { errorTypes } from "../../utilities/errorHandlers/enums";
import { ResponseFromDatabase } from "../../utilities/errorHandlers/types";

export async function saveTestMessageController(request: Request, response: Response, next: NextFunction) {
    const message: string = request.body.message;
    const newTestModel = new TestMessageModel(undefined, message);
    try {
        const saveResult: InsertOneResult<TestMessageDocumentType> = (await newTestModel.save()) as InsertOneResult<Document>;
        throwError({ type: errorTypes.GENERAL_ERROR }, saveResult);
        response.status(201).json({ message: "The test message was saved successfully!", insertedId: saveResult.insertedId });
    } catch (error) {
        next(error);
    }
}
export async function getTestMessageController(request: Request, response: Response, next: NextFunction) {
    const _id = new ObjectId(request.params._id);
    try {
        const result: WithId<TestMessageDocumentType | null> | null = await TestMessageModel.getTestMessage(_id);
        throwError({ type: errorTypes.GENERAL_ERROR }, result as ResponseFromDatabase);
        response.status(200).json({ message: "The test message was retrieved successfully!", result });
    } catch (error) {
        next(error);
    }
}
export async function updateTestMessageController(request: Request, response: Response, next: NextFunction) {
    const _id = new ObjectId(request.body._id);
    const message: string = request.body.message;
    const testModel = new TestMessageModel(_id, message);
    try {
        const updateResult: UpdateResult = (await testModel.save()) as UpdateResult;
        throwError({ type: errorTypes.GENERAL_ERROR }, updateResult);
        response.status(200).json({ message: "The test message was updated successfully" });
    } catch (error) {
        next(error);
    }
}
export async function deleteTestMessageController(request: Request, response: Response, next: NextFunction) {
    const _id = new ObjectId(request.params._id);
    try {
        const deleteResult: DeleteResult = await TestMessageModel.deleteTestMessage(_id);
        throwError({ type: errorTypes.DELETE_ONE }, deleteResult);
        response.status(200).json({ message: "The message was deleted successfully!" });
    } catch (error) {
        next(error);
    }
}
