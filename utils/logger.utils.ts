import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Create logs folder automatically
const logDir = 'logs';

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

class Logger {

    public logger: winston.Logger;

    constructor() {

        this.logger = winston.createLogger({

            level: 'info',

            format: winston.format.combine(

                winston.format.timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss',
                }),

                winston.format.printf(({ timestamp, level, message }) => {
                    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
                })

            ),

            transports: [

                // Console Logging
                new winston.transports.Console(),

                // File Logging
                new winston.transports.File({
                    filename: path.join(logDir, 'execution.log'),
                }),

            ],
        });
    }

    info(message: string) {
        this.logger.info(message);
    }

    error(message: string) {
        this.logger.error(message);
    }

    warn(message: string) {
        this.logger.warn(message);
    }
}

const logger = new Logger();

export default logger;