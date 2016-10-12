export default {
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
  close: function close(ctx) {
    ctx.body = `
      <script type="text/javascript" charset="utf-8">
        if (window.opener && window.name === "auth_popup") {
          window.close();
        }
      </script>`;
    ctx.status = 200;
  }
};
