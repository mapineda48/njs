import path from 'path';
import express from 'express';
import { api, ResHello } from '../src/app/service';

const build = path.join(__dirname, '..', 'build');

const hello: ResHello = { message: 'Hello world from express!!!' };

export = function create() {
  const router = express.Router();

  router.use(express.static(build));

  router.get(api.hello, (req, res) => {
    res.json(hello);
  });

  return router;
};
