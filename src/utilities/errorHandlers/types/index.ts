import { ObjectId } from "mongodb";
export interface ErrorHolder {
    type: string;
    message?: string;
    statusCode?: number;
    data?: Record<string, unknown>;
}
export interface ThrowError {
    (errorHolder: ErrorHolder, response: Record<string, unknown>): void;
}
export interface ResponseFromDatabase {
    insertedCount?: number | undefined;
    modifiedCount?: number | undefined;
    matchedCount?: number | undefined;
    deletedCount?: number | undefined;
    name?: string;
    insertedId?: ObjectId;
    result?: { ok: number };
}
