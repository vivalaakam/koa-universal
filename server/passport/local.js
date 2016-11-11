import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import User from '../models/user';

const userModel = new User();

export default new Strategy(async(username, password, done) => {
  let user = await userModel.find({ username });
  if (user) {
    try {
      await userModel.checkPassword(username, password);
      return done(null, user);
    } catch (e) {
      return done(null, false, JSON.stringify({
        message: e.message
      }));
    }
  }
  user = await userModel.create({
    username,
    password: bcrypt.hashSync(password, 8)
  });
  return done(null, user);
});
