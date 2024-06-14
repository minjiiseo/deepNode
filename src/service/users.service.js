import { userRepository } from '../repositories/users.repository.js';

class UserService {
  getMe = async (userId) => {
    const user = await userRepository.findUnique({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  };
}

export const userService = new UserService();
