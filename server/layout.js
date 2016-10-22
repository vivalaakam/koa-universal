export default (locals = { storeState: {}, content: '' }) => (`
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Boilerplate</title>
      <link href="/styles.css" rel="stylesheet" />
    </head>
    <body>
      <div id="app">${locals.content}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(locals.storeState)}
      </script>

      <script src="/js/client.js"></script>
    </body>
  </html>
`);
