export default (locals = {store_state: {}, content: ""}) => `
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Boilerplate</title>
    </head>
    <body>
      <div id="app">${locals.content}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(locals.store_state)}
      </script>

      <script src="/assets/js/client.js"></script>
    </body>
  </html>
`