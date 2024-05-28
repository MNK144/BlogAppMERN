import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import { LOG_DIR } from '../config/config.js';

// Log severity levels.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

// if the server was run in development mode; otherwise show only warn and error messages.
const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

// Configuring colors for log levels
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}
winston.addColors(colors);

// Formatting the log
const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`,
  ),
)

// Defines which transports the logger must use to print out messages.
const transports = [
  // logging in console
  new winston.transports.Console(),
  // all log setting
  new winstonDaily({
    datePattern: 'YYYY-MM-DD',
    dirname: `${LOG_DIR}`,
    filename: `%DATE%.log`,
    maxFiles: 30, // 30 Days saved
    json: false,
    format: winston.format.uncolorize(),
    zippedArchive: true,
  }),
  // error log setting
  new winstonDaily({
    level: 'error',
    datePattern: 'YYYY-MM-DD',
    dirname: `${LOG_DIR}/errors`, 
    filename: `%DATE%.log`,
    maxFiles: 30, // 30 Days saved
    handleExceptions: true,
    json: false,
    format: winston.format.uncolorize(),
    zippedArchive: true,
  }),
]

// Create the logger instance that has to be exported
const logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
})

export default logger;