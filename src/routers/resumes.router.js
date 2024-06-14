import express from 'express';
import { resumesController } from '../controllers/resumes.controller.js';
import { createResumeValidator } from '../middlewares/validators/create-resume-validator.middleware.js';
import { updateResumeValidator } from '../middlewares/validators/update-resume-validator.middleware.js';
import { requireAccessToken } from '../middlewares/require-access-token.middleware.js';

const resumesRouter = express.Router();

resumesRouter.post('/', requireAccessToken, createResumeValidator, resumesController.createResume);
resumesRouter.get('/', requireAccessToken, resumesController.getResumes);
resumesRouter.get('/:id', requireAccessToken, resumesController.getResumeById);
resumesRouter.put('/:id', requireAccessToken, updateResumeValidator, resumesController.updateResume);
resumesRouter.delete('/:id', requireAccessToken, resumesController.deleteResume);

export { resumesRouter };
