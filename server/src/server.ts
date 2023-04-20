import type { FastifyServerOptions } from 'fastify';
import fastify from 'fastify';
import mercurius from 'mercurius';
import cors from '@fastify/cors';
import { context } from '~/graphql/context';
import { resolvers } from '~/graphql/resolvers';
import { schemaLoader } from '~/graphql/loader';

const initServer = async (opts?: FastifyServerOptions) => {
  const app = fastify(opts);

  app.register(cors, {
    origin: '*',
  });

  app.register(mercurius, {
    schema: schemaLoader(app),
    context: context,
    resolvers: resolvers,
    graphiql: true,
    path: '/graphql',
  });

  if (import.meta.env.PROD) {
    try {
      const PORT = 7700;
      app.listen({ port: PORT });
      console.log('Listening on port', PORT);
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  }

  return app;
};

export const viteNodeApp = initServer();
