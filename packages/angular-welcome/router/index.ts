import path from 'path';
import express from 'express';
import { api } from '../src/shared';
import model from './data';

module.exports = create;

const build = path.join(__dirname, '..', 'build');

export default function create() {
  const router = express.Router();

  router.use(express.static(build));

  router.get(`/${api.home}`, (req, res) => res.json({ data: model.home }));

  router.get(`/${api.content}`, (req, res) => res.json({ data: model.content }));

  return router;
}
