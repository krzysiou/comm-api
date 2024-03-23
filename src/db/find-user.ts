import type { User } from '../types';

import { users } from '../bindings';

type FindUserParams = {
  username?: string;
  id?: string;
};

type FindUser = (params: FindUserParams) => Promise<User | undefined>;

const findUser: FindUser = async ({ id, username }) => {
  try {
    if (id) {
      const user = users.find((user) => user.id === id);

      return user;
    }

    if (username) {
      const user = users.find((user) => user.username === username);

      return user;
    }
  } catch (error) {
    console.log(error);
  }
};

export { findUser };
