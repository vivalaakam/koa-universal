import Auth from '../models/auth';
const authModel = new Auth();

export default {
    login: async function login(ctx, next) {
        const data = await authModel.login(ctx.request.body.email, ctx.request.body.password);
        ctx.body = data;
    },
    logout: function logout(ctx, next) {
        ctx.logout();
        ctx.redirect('/');

    },
    current: function current(ctx, next) {
        const auth = JSON.parse(ctx.state.user || "{}");
        ctx.body = auth;
    },
    close: function close(ctx, next) {
        ctx.body = `
                    <script type="text/javascript" charset="utf-8">
                      if (window.opener && window.name === "auth_popup") {
                        window.close();
                      }
                    </script>`;
        ctx.status = 200;
    }
}