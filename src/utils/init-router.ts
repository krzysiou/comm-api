import { createServer } from 'node:http';

import { Server } from 'socket.io';

import type { Express } from 'express';
import type { Binding } from '../types';

import { logBinding } from './log-binding';
import { onChatMessage } from '../core/messages/on-chat-message';
import { onChatDelete } from '../core/messages/on-chat-delete';

const initRouter = (
  app: Express,
  origin: string,
  port: string | undefined,
  bindings: Binding[]
) => {
  if (!port) {
    console.log('Please provide viable port');

    return;
  }

  bindings.forEach(({ method, path, callback, middleware }) => {
    if (method !== 'GET' && path.includes(':')) {
      console.log(
        'Cannot use request parameters with requests other that GET in'
      );
      logBinding({ method, path, callback, middleware });

      return;
    }

    if (method == 'GET') {
      middleware
        ? app.get(path, middleware, callback)
        : app.get(path, callback);

      return;
    }

    if (method == 'POST') {
      middleware
        ? app.post(path, middleware, callback)
        : app.post(path, callback);

      return;
    }
  });

  const server = createServer(app);
  const io = new Server(server, {
    cors: {
      origin,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    socket.on('chat message', onChatMessage(io));
    socket.on('chat delete', onChatDelete(io));
  });

  server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

export { initRouter };
