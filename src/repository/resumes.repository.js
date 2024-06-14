import { prisma } from '../utils/prisma.util.js';

class ResumeRepository {
  create = async (data) => {
    return prisma.resume.create({ data });
  };

  findMany = async (where, orderBy) => {
    return prisma.resume.findMany({ where, orderBy, include: { author: true } });
  };

  findUnique = async (where) => {
    return prisma.resume.findUnique({ where, include: { author: true } });
  };

  update = async (where, data) => {
    return prisma.resume.update({ where, data });
  };

  delete = async (where) => {
    return prisma.resume.delete({ where });
  };
}

export const resumeRepository = new ResumeRepository();
