import 'dotenv/config';

import logger from './logger.js';
import { startMetricsServer, stopMetricsServer } from './metrics.js';

await startMetricsServer(Number(process.env.METRICS_PORT));
logger.info('Hello, World!');

let isShuttingDown = false;
async function shutdown() {
  if (isShuttingDown) {
    logger.info('Shutdown called but one is already in progress.');
    return;
  }

  isShuttingDown = true;

  logger.info('Shutting down gracefully...');
  try {
    await stopMetricsServer();
  } catch (error) {
    logger.error(`Error closing Metrics server: ${(error as Error).message}`);
    process.exit(1);
  }

  process.exit(0);
}

process.on('SIGINT', () => {
  shutdown().catch((error: unknown) => {
    logger.error(`Shutdown failed: ${(error as Error).message}`);
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  shutdown().catch((error: unknown) => {
    logger.error(`Shutdown failed: ${(error as Error).message}`);
    process.exit(1);
  });
});
