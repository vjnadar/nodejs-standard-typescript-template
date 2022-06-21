import { Express, NextFunction, Request, Response } from "express";
import winston from "winston";

import { ErrorType } from "../../generalTypes";

function mainErrorHandler(server: Express) {
    server.use((error: ErrorType, request: Request, response: Response, next: NextFunction) => {
        const statusCode = error.statusCode ?? 500;
        const message = error.message || "Server error";
        const data = error.data ?? error;
        winston.error("Main Error Control", error);
        response.status(statusCode).json({ message, statusCode, data });
    });
}

export default mainErrorHandler;
