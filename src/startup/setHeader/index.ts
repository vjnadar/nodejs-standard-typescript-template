import { Express, NextFunction, Request, Response } from "express";

function setHeader(server: Express) {
    server.use((request: Request, response: Response, next: NextFunction) => {
        response.setHeader("Access-Control-Allow-Orgin", "*");
        response.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,POST,PUT,PATCH");
        next();
    });
}

export default setHeader;
