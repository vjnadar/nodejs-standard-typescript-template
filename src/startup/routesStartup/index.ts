import express, { Express } from "express";

import MainRouter from "../../routes/RouterSingleton";

function routesStartup(server: Express) {
    server.use(express.json());
    server.use("", MainRouter.getRouter());
}

export default routesStartup;
