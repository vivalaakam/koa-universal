import bcrypt from 'bcrypt';
import { Strategy } from 'passport-local';
import User from '../models/user';

const userModel = new User();

export default new Strategy(async(username, password, done) => {
  const users = await userModel.list({ username });
  if (users.length > 0) {
    const user = users[0];
    if (!bcrypt.compareSync(password, user.password)) {
      return done(null, false, JSON.stringify({
        message: 'Incorrect password.'
      }));
    }
    delete user.password;
    return done(null, user);
  }
  const user = await userModel.create({
    username,
    password: bcrypt.hashSync(password, 8)
  });
  delete user.password;
  return done(null, user);
});
