import type { Conversation } from '../types';

import { conversations } from '../bindings';

const findConversation = async (
  senderId: string,
  recieverId: string
): Promise<Conversation | undefined | null> => {
  try {
    if (!senderId || !recieverId) {
      return null;
    }

    const conversation: Conversation | undefined = conversations.find(
      ({ person1Id, person2Id }) =>
        (person1Id === senderId && person2Id === recieverId) ||
        (person1Id === recieverId && person2Id === senderId)
    );

    if (!conversation) {
      return undefined;
    }

    return conversation;
  } catch (error) {
    console.log(error);

    return undefined;
  }
};

export { findConversation };
