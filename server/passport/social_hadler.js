import Auth from '../models/auth';

const auth = new Auth();
const url = (type, port = 3000) => `http://localhost:${port}/api/auth/${type}/callback`;

export { url };

export function callback(mapper, type) {
  return async(accessToken, refreshToken, profile, done) => {
    if (accessToken !== null) {
      const users = await auth.getAll(profile.username, type);
      if (users.length > 0) {
        return done(null, users[0]);
      }

      const user = await auth.create(mapper(profile));
      delete user.password;
      return done(null, user);
    }
    return done('err');
  };
}
