import Fastify from 'fastify';
import { Registry, collectDefaultMetrics } from 'prom-client';

import logger from './logger.js';

const register = new Registry();
collectDefaultMetrics({ register });

const app = Fastify({
  loggerInstance: logger,
  disableRequestLogging: true,
});

app.get('/metrics', async (request, reply) => {
  const metrics = await register.metrics();
  reply.type(register.contentType).send(metrics);
});

const startMetricsServer = async (port: number, host = '127.0.0.1') => {
  try {
    await app.listen({
      port,
      host,
      listenTextResolver: (address) => `Metrics server started and available at ${address}/metrics`,
    });
  } catch (error) {
    app.log.error(`Error starting Metrics server: ${(error as Error).message}`);
  }
};

const stopMetricsServer = async () => {
  await app.close();
};

export { startMetricsServer, stopMetricsServer };
