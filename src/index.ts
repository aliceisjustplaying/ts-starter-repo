import dotenv from 'dotenv';

import logger from './logger.js';

dotenv.config();

logger.info('Hello, World!');

function shutdown() {
  setTimeout(() => {
    logger.error('Forcing shutdown.');
    process.exit(1);
  }, 60000);


  logger.info('Shutting down gracefully...');

  // ...
  process.exit(0);

}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
