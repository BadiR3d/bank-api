// src/logger.ts

import pino from 'pino';
import * as fs from 'fs';
import * as path from 'path';
import * as stream from 'stream';
import pinoPretty from 'pino-pretty';
import { ENVIRONMENT } from '../config/globals';

// Create a log directory if it doesn't exist
const logDirectory = path.join(__dirname, 'logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a writable stream for the log file
const logStream = pino.destination(path.join(logDirectory, 'app.log'));

// Set up pretty-printing in non-production environments
let prettyStream: stream.Transform | null = null;
if (process.env.NODE_ENV !== 'production') {
  prettyStream = pinoPretty({
    colorize: true,  // Add color to the logs
    translateTime: 'SYS:standard',  // Format timestamps
    ignore: 'pid,hostname',  // Ignore pid and hostname in pretty print
  });
}

// Create a Pino logger instance
const logger = pino(
  {
    level: ENVIRONMENT.APP.LOG_LEVEL || 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  prettyStream ? prettyStream : logStream  // Use prettyStream in non-prod or fallback to logStream
);

export default logger;
