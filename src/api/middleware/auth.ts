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
