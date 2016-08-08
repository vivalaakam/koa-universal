import passport from '../passport';
import Router from 'koa-router';
import auth from '../controllers/auth';

const router = new Router();
router
    .get('/', auth.current)
    .get('/logout', auth.logout)
    .get('/close', auth.close)
    .get('/github', passport.authenticate('github'))
    .get('/github/callback', passport.authenticate('github', {
        successRedirect: '/api/auth/close',
        failureRedirect: '/'
    }));

export default router;