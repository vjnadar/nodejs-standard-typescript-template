import Joi from "joi";

import { ErrorType } from "../../generalTypes";
import { errorTypes } from "./enums";
import { ErrorHolder, ResponseFromDatabase } from "./types";
export function throwError(errorHolder: ErrorHolder, response: ResponseFromDatabase | Joi.ValidationError | undefined): void | ErrorType {
    switch (errorHolder.type) {
        case errorTypes.GENERAL_ERROR: {
            if (!response) {
                const error: ErrorType = createError(errorHolder.message, errorHolder.statusCode, errorHolder.data);
                throw error;
            }
            break;
        }
        case errorTypes.GENERAL_ERROR_INVERSE: {
            if (response) {
                const error: ErrorType = createError(errorHolder.message, errorHolder.statusCode, errorHolder.data);
                error.statusCode = errorHolder.statusCode;
                throw error;
            }
            break;
        }
        case errorTypes.INSERT_ONE: {
            if ((response as ResponseFromDatabase)?.insertedCount !== undefined && (response as ResponseFromDatabase)?.insertedCount !== 1) {
                const error: ErrorType = createError(errorHolder.message ?? "The insertion operation failed.", 500);

                throw error;
            } else if (response?.name === "MongoError") {
                const error: ErrorType = createError("MongoDb error. Check database", 500);
                throw error;
            }
            break;
        }
        case errorTypes.INSERT_ONE_OBJECT_WITH_IMAGES: {
            if ((response as ResponseFromDatabase).insertedCount !== undefined && (response as ResponseFromDatabase).insertedCount !== 1) {
                const error: ErrorType = createError(errorHolder.message ?? "The insertion operation failed.", 500);

                return error;
            } else if ((response as ResponseFromDatabase).name === "MongoError") {
                const error: ErrorType = createError("MongoDb error. Check database", 500);
                return error;
            }
            break;
        }
        case errorTypes.UPDATE_ONE: {
            if (
                (response as ResponseFromDatabase).modifiedCount !== undefined &&
                (response as ResponseFromDatabase).modifiedCount !== 1 &&
                (response as ResponseFromDatabase).matchedCount !== 1
            ) {
                const error: ErrorType = createError(errorHolder.message ?? "The update operation failed.", 500);
                throw error;
            } else if ((response as ResponseFromDatabase).name === "MongoError") {
                const error: ErrorType = createError("MongoDb error. Check database", 500);
                throw error;
            }
            break;
        }
        case errorTypes.UPDATE_MANY: {
            if (
                (response as ResponseFromDatabase)?.modifiedCount !== undefined &&
                !(((response as ResponseFromDatabase)?.modifiedCount as number) >= 1) &&
                (response as ResponseFromDatabase)?.result?.ok === 1
            ) {
                const error: ErrorType = createError(errorHolder.message ?? "The update operation failed due to an inappropriate query.", 500);
                throw error;
            } else if ((response as ResponseFromDatabase).name === "MongoError") {
                const error: ErrorType = createError("MongoDb error. Check database", 500);
                throw error;
            }
            break;
        }
        case errorTypes.DELETE_ONE: {
            if ((response as ResponseFromDatabase).deletedCount !== undefined && (response as ResponseFromDatabase).deletedCount !== 1) {
                const error: ErrorType = createError(errorHolder.message ?? "The deletion operation failed.", 500);
                throw error;
            } else if ((response as ResponseFromDatabase).name === "MongoError") {
                const error: ErrorType = createError("MongoDb error. Check database", 500);
                throw error;
            }
            break;
        }
        case errorTypes.DELETE_MANY: {
            if (
                (response as ResponseFromDatabase).deletedCount !== undefined &&
                !(((response as ResponseFromDatabase)?.deletedCount as number) >= 1) &&
                (response as ResponseFromDatabase)?.result?.ok === 1
            ) {
                const error: ErrorType = createError(errorHolder.message ?? "The deletion operation failed due to inappropriate query", 500);
                throw error;
            } else if ((response as ResponseFromDatabase).name === "MongoError") {
                const error: ErrorType = createError("MongoDb error. Check database", 500);
                throw error;
            }
            break;
        }
        default: {
            return;
        }
    }
}
function createError(message: string | undefined, statusCode: number | undefined, data?: Record<string, unknown> | undefined): ErrorType {
    const error: ErrorType = new Error(message) as ErrorType;
    if (statusCode) error.statusCode = statusCode;
    if (data) error.data = data;
    return error;
}
