import type { Conversation } from '../types';

import { conversations } from '../bindings';

const saveConversation = async (
  senderId: string,
  recieverId: string
): Promise<Conversation> => {
  const conversation: Conversation = {
    person1Id: senderId,
    person2Id: recieverId,
    messages: [],
  };

  try {
    conversations.push(conversation);

    return conversation;
  } catch (error) {
    console.log(error);
  }

  return conversation;
};

export { saveConversation };
