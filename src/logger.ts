import { pino } from 'pino';
import pretty from 'pino-pretty';

const logger = pino(
  {
    level: process.env.LOG_LEVEL ?? 'info',
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  pretty({
    sync: process.env.NODE_ENV !== 'production' ? true : false,
    colorize: true,
    translateTime: 'SYS:standard',
  }),
);
export default logger;
