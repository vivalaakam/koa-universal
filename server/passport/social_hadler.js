import UserSocial from '../models/user_social';
import User from '../models/user';

const userSocialModel = new UserSocial();
const userModel = new User();
const url = (type, port = 3000) => `http://localhost:${port}/api/auth/${type}/callback`;

export { url };

export function callback(mapper, type) {
  return async(accessToken, refreshToken, profile, done) => {
    if (accessToken !== null) {
      const parsed = mapper(profile);

      const current = await userSocialModel.find(type, parsed.login);
      if (current) {
        return done(null, current.user);
      }

      const user = await userModel.create({ social: [parsed] });
      delete user.password;
      return done(null, user);
    }
    return done('err');
  };
}
