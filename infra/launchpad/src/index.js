const express = require('express');
const next = require('next');

const apiRouter = require('./api');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './src/web' });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use('/api', apiRouter.router);

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on http://localhost:3000');
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });