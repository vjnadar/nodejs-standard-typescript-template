import winston from "winston";

function logger() {
    winston.add(new winston.transports.File({ filename: "info.log" }));
    winston.exceptions.handle(new winston.transports.File({ filename: "uncaughtexception.log" }));
    process.on("unhandledRejection", (ex) => {
        winston.error("Unhandled rejection", ex);
        throw ex;
    });
}

export default logger;
