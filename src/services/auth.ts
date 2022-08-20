import { Service } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '@src/config';

@Service()
export default class AuthService {
  constructor() {}

  /**
   * generate jwt by email
   * @param email login user email
   * @returns jwt
   */
  public authByEmail(email: string) {
    const payload = {
      email,
    };
    const token = jwt.sign(payload, config.jwtSecretKey);
    return token;
  }
}
