import { resumeRepository } from '../repositories/resumes.repository.js';

class ResumeService {
  createResume = async (authorId, title, content) => {
    return resumeRepository.create({
      authorId,
      title,
      content,
    });
  };

  getResumes = async (authorId, sort = 'desc') => {
    const orderBy = { createdAt: sort };
    return resumeRepository.findMany({ authorId }, orderBy);
  };

  getResumeById = async (id, authorId) => {
    return resumeRepository.findUnique({ id, authorId });
  };

  updateResume = async (id, authorId, title, content) => {
    const resume = await resumeRepository.findUnique({ id, authorId });
    if (!resume) {
      throw new Error('Resume not found');
    }

    return resumeRepository.update({ id, authorId }, { title, content });
  };

  deleteResume = async (id, authorId) => {
    const resume = await resumeRepository.findUnique({ id, authorId });
    if (!resume) {
      throw new Error('Resume not found');
    }

    return resumeRepository.delete({ id, authorId });
  };
}

export const resumeService = new ResumeService();
