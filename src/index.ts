import dotenv from 'dotenv';

import logger from './logger.js';

dotenv.config();

logger.info('Hello, World!');

function shutdown() {
  logger.info('Shutting down gracefully...');

  // ...
  process.exit(0);

}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
