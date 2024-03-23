import type { User } from '../types';

import { users } from '../bindings';

const saveUser = async (user: User) => {
  users.push(user);
};

export { saveUser };
