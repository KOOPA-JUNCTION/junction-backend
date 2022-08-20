import { Inject, Service } from 'typedi';
import jwt from 'jsonwebtoken';
import config from '@src/config';
import User from '@src/models/user';

@Service()
export default class AuthService {
  constructor(@Inject('models.user') private userModel: typeof User) {}

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

  /**
   * generate jwt by address
   * @param address wallet address
   * @returns jwt
   */
  public async authByAddress(address: string) {
    const user =
      (await this.userModel.findOne({ address }).lean()) ??
      (await this.userModel.create({ address }));
    const payload = {
      _id: user._id,
      address,
    };
    const token = jwt.sign(payload, config.jwtSecretKey);
    return token;
  }
}
