import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/users.repository.js';
import { HASH_SALT_ROUNDS, ACCESS_TOKEN_EXPIRES_IN } from '../constants/auth.constant.js';
import { ACCESS_TOKEN_SECRET } from '../constants/env.constant.js';
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/message.constant.js';

class AuthService {
  signUp = async (email, password, name) => {
    const existedUser = await userRepository.findUnique({ email });

    if (existedUser) {
      return {
        status: HTTP_STATUS.CONFLICT,
        message: MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED,
      };
    }

    const hashedPassword = await bcrypt.hash(password, HASH_SALT_ROUNDS);

    const data = await userRepository.create({
      email,
      password: hashedPassword,
      name,
    });

    return {
      status: HTTP_STATUS.CREATED,
      message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
      data: {
        id: data.id,
        email: data.email,
        name: data.name,
      },
    };
  };

  signIn = async (email, password) => {
    const user = await userRepository.findUnique({ email });

    const isPasswordMatched = user && await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return {
        status: HTTP_STATUS.UNAUTHORIZED,
        message: MESSAGES.AUTH.COMMON.UNAUTHORIZED,
      };
    }

    const payload = { id: user.id };

    const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    });

    return {
      status: HTTP_STATUS.OK,
      message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
      data: { accessToken },
    };
  };
}

export const authService = new AuthService();
