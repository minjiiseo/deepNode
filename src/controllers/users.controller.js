import { userService } from '../services/users.service.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class UsersController {
  getMe = async (req, res, next) => {
    try {
      const data = await userService.getMe(req.user.id);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const usersController = new UsersController();
