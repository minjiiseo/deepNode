import { prisma } from '../utils/prisma.util.js';

class UserRepository {
  findUnique = async (where) => {
    return prisma.user.findUnique({ where });
  };

  create = async (data) => {
    return prisma.user.create({ data });
  };
}

export const userRepository = new UserRepository();
