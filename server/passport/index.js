import passport from 'koa-passport';
import Auth from '../models/auth';
import github from './github';

const auth = new Auth();

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    let user = await auth.getId(id);
    done(null, user);
});

passport.use(github);

export default passport;