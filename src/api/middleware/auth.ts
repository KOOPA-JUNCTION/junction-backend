import HttpException from '@src/exceptions/HttpException';
import AuthService from '@src/services/auth';
import expressAsyncHandler from 'express-async-handler';
import Container from 'typedi';

export interface UserInfo {
  _id: string;
  address: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserInfo;
    }
  }
}

export const attachJwtInformation = expressAsyncHandler((req, res, next) => {
  const authService = Container.get(AuthService);
  if (!req.token) return next();
  try {
    const payload = authService.decodeJwt(req.token) as UserInfo;
    req.user = payload;
    next();
  } catch {
    next();
  }
});

export const authRequired = expressAsyncHandler((req, res, next) => {
  if (!req.user) {
    throw new HttpException(401, '로그인이 필요합니다.');
  }
  next();
});
