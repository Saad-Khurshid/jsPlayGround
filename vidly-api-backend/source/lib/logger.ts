import winston from 'winston';
import 'express-async-errors';
import path from 'path';

const errorLogsFile = path.join(__dirname, '..', '..', 'logs', 'error.log');
const allLogsFile = path.join(__dirname, '..', '..', 'logs', 'allLogs.log');
const exceptionAndRejectionsLogsFile = path.join(
    __dirname,
    '..',
    '..',
    'logs',
    'exceptionsRejections.log'
);

// Define your severity levels.
// With them, You can create log files,
// see or hide levels based on the running ENV.
const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

// This method set the current severity based on
// the current NODE_ENV: show all the log levels
// if the server was run in development mode; otherwise,
// if it was run in production, show only warn and error messages.
const setLevel = () => {
    const env = process.env.NODE_ENV || 'development';
    const isDevelopment = env === 'development';
    return isDevelopment ? 'debug' : 'warn';
};

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

// Tell winston that you want to link the colors
// defined above to the severity levels.
winston.addColors(colors);

// Chose the aspect of your log customizing the log format.
const format = winston.format.combine(
    // Add the message timestamp with the preferred format
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    // Tell Winston that the logs must be colored
    winston.format.colorize({ all: true }),
    // Define the format of the message showing the timestamp, the level and the message
    winston.format.printf(
        (info) => `\n${info.timestamp} ${info.level}: ${info.message}`
    )
);

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    new winston.transports.File({ filename: errorLogsFile, level: 'error' }),
    new winston.transports.File({ filename: allLogsFile })
];

const exceptionAndRejectionsHandlers = [
    new winston.transports.File({ filename: exceptionAndRejectionsLogsFile }),
    new winston.transports.Console({
        format: winston.format.prettyPrint()
    })
];

// const rejectionHandlers = [
//     new winston.transports.File({ filename: errorLogsFile })
// ];

const logger = winston.createLogger({
    level: setLevel(),
    levels,
    format,
    transports,
    exceptionHandlers: exceptionAndRejectionsHandlers,
    //@ts-ignore
    rejectionHandlers: exceptionAndRejectionsHandlers
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: winston.format.simple()
        })
    );
}

export default logger;
