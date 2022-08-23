import { config } from "dotenv";
import { Db, MongoClient } from "mongodb";
import winston from "winston";
config();

let client: MongoClient;
let cachedDatabase: Db;
async function getDatabaseAccess(): Promise<Db> {
    if (cachedDatabase) {
        return cachedDatabase;
    }
    try {
        const url: string = process.env.NODE_ENV === "DEV" || process.env.NODE_ENV === "test" ? (process.env.MONGO_HOST_DEV as string) : "";
        client = new MongoClient(url);
        await client.connect();
        const database = client.db();
        cachedDatabase = database;
        return database;
    } catch (error) {
        winston.exceptions.handle(new winston.transports.File({ filename: "dbexception.log" }));
        console.error(error);
    }
    return client.db();
}
export function getClient(): MongoClient {
    return client;
}

export default getDatabaseAccess;
