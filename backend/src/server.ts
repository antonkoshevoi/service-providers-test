import Fastify from 'fastify';
import { inspectorRoutes } from './routes/inspector.routes';
import cors from '@fastify/cors';
import knex from './database/database'

const fastify = Fastify({ logger: false });

fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.register(inspectorRoutes);

const start = async () => {
  try {
    await knex.raw('SELECT 1');
    await fastify.listen({ port: 3000 });
    console.log('🚀 Server is running on port 3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();