import { Express } from "express";
import { Server } from "node:http";
import winston from "winston";
let _server: Server;

function listener(server: Express): Server {
    _server = server.listen(8080, () => {
        winston.info("Started the application!");
    });
    return _server;
}

export default listener;
