import { authService } from '../services/auth.service.js';

class AuthController {
  signUp = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;
      const result = await authService.signUp(email, password, name);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const result = await authService.signIn(email, password);
      res.status(result.status).json(result);
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
