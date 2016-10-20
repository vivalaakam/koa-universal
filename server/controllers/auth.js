import passport from '../passport';

export default {
  auth(ctx, next) {
    return passport.authenticate('local', (user, info = false) => {
      if (info) {
        ctx.body = info;
        ctx.status = 401;
        return false;
      }
      ctx.body = user;
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
  }
};
