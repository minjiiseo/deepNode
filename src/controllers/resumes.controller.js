import { resumeService } from '../services/resumes.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class ResumesController {
  createResume = async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const authorId = req.user.id;
      const data = await resumeService.createResume(authorId, title, content);

      res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getResumes = async (req, res, next) => {
    try {
      const authorId = req.user.id;
      const { sort } = req.query;
      const data = await resumeService.getResumes(authorId, sort);

      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getResumeById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      const data = await resumeService.getResumeById(id, authorId);

      if (!data) {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
        });
      }

      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.READ_DETAIL.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateResume = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      const authorId = req.user.id;
      const data = await resumeService.updateResume(id, authorId, title, content);

      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.UPDATE.SUCCEED,
        data,
      });
    } catch (error) {
      if (error.message === 'Resume not found') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
        });
      }
      next(error);
    }
  };

  deleteResume = async (req, res, next) => {
    try {
      const { id } = req.params;
      const authorId = req.user.id;
      await resumeService.deleteResume(id, authorId);

      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.RESUMES.DELETE.SUCCEED,
        data: { id },
      });
    } catch (error) {
      if (error.message === 'Resume not found') {
        return res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.RESUMES.COMMON.NOT_FOUND,
        });
      }
      next(error);
    }
  };
}

export const resumesController = new ResumesController();
