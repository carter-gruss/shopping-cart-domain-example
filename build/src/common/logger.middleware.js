"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logHandler = void 0;
const winston = require("winston");
const logger = winston.createLogger({
    transports: [new winston.transports.Console()],
});
function logHandler(req, res, next) {
    try {
        logger.info(`Req: ${req.path}`);
        next();
    }
    catch (error) {
        next(error);
    }
}
exports.logHandler = logHandler;
//# sourceMappingURL=logger.middleware.js.map