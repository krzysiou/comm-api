import type { Server } from 'socket.io';
import type { MessagePayload } from '../../types';

import { findConversation } from '../../db/find-conversation';
import { saveConversation } from '../../db/save-conversation';

const onChatMessage =
  (io: Server) => async (messagePayload: MessagePayload) => {
    let conversation = await findConversation(
      messagePayload.senderId,
      messagePayload.recieverId
    );

    if (conversation === null) {
      console.error('Somethign went wrong');

      io.emit('chat message', {
        ...messagePayload,
        mesage: '[Server] Something went wrong',
      });
    }

    if (conversation === undefined) {
      conversation = await saveConversation(
        messagePayload.senderId,
        messagePayload.recieverId
      );
    }

    conversation && conversation.messages.push(messagePayload);

    io.emit('chat message', messagePayload);
  };

export { onChatMessage };
