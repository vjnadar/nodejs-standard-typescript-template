import express from "express";
const server = express();
import "./routes";

import { config } from "dotenv";

import listener from "./startup/listener";
import logger from "./startup/logger";
import mainErrorHandler from "./startup/mainErrorHandler";
import routesStartUp from "./startup/routesStartup";
import setHeader from "./startup/setHeader";

config();
logger();
setHeader(server);
routesStartUp(server);
mainErrorHandler(server);
const _server = listener(server);
export default _server;
