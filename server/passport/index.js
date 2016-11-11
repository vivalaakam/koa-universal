import passport from 'koa-passport';
import User from '../models/user';
import github from './github';
import local from './local';

const userModel = new User();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async(id, done) => {
  const user = await userModel.getId(id);
  delete user.password;
  done(null, user);
});

passport.use(local);
passport.use(github);

export default passport;
