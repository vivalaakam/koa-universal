import passport from 'koa-passport';
import Auth from '../models/auth';
import github from './github';
import local from './local';

const auth = new Auth();

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async(id, done) => {
  const user = await auth.getId(id);
  delete user.password;
  done(null, user);
});

passport.use(local);
passport.use(github);

export default passport;
