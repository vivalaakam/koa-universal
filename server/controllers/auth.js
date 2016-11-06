import jwt from 'jsonwebtoken';
import passport from '../passport';
import Auth from '../models/auth';

const authModel = new Auth();

export default {
  auth(ctx, next) {
    return passport.authenticate('local', (user, info = false) => {
      if (info) {
        ctx.body = info;
        ctx.status = 401;
        return false;
      }
      ctx.body = user;
      const token = jwt.sign({ id: user.id, iat: Math.floor(Date.now() / 1000) }, process.env.SECRET_KEY);
      ctx.set('Authorization', `JWT ${token}`);
      return ctx.login(user);
    })(ctx, next);
  },
  login: async function login(ctx) {
    const auth = ctx.state.user;
    ctx.body = auth;
  },
  logout: function logout(ctx) {
    ctx.logout();
    ctx.redirect('/');
  },
  current: function current(ctx) {
    const auth = ctx.state.user;
    ctx.body = auth;
  },
  close(ctx) {
    ctx.body = `
      <script type="text/javascript" charset="utf-8">
        if (window.opener && window.name === "auth_popup") {
          window.close();
        }
      </script>`;
    ctx.status = 200;
  },
  check: async function check(ctx, next) {
    try {
      const token = ctx.get('Authorization').split(' ')[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const current = ctx.state.user;
      if (!ctx.isAuthenticated() || decoded.user_id !== current.id) {
        const user = await authModel.getId(decoded.id);
        ctx.login(user);
      }
      return next();
    } catch (err) {
      ctx.status = 401;
      return ctx;
    }
  }
};
