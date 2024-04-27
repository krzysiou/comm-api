import type { Server } from 'socket.io';
import type { MessagePayload } from '../../types';

import { findConversation } from '../../db/find-conversation';

const onChatDelete = (io: Server) => async (messagePayload: MessagePayload) => {
  const conversation = await findConversation(
    messagePayload.senderId,
    messagePayload.recieverId
  );

  if (conversation === null || conversation == undefined) {
    console.error('Somethign went wrong');

    io.emit('chat delete', {
      ...messagePayload,
      mesage: '[Server] Something went wrong',
    });

    return;
  }

  if (conversation) {
    conversation.messages.forEach((message, index) => {
      if (
        message.senderId === messagePayload.senderId &&
        message.recieverId === messagePayload.recieverId &&
        message.message === messagePayload.message
      ) {
        conversation.messages.splice(index, 1);
      }
    });
  }

  io.emit('chat delete', conversation.messages);
};

export { onChatDelete };
