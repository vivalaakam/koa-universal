import Router from 'koa-router';
import doings from '../controllers/doings';
import { check } from './auth';

const router = new Router();
router
  .get('/', check, doings.list)
  .get('/:id', check, doings.getId)
  .post('/', check, doings.createItem)
  .put('/:id', doings.updateItem)
  .delete('/:id', check, doings.removeItem);

export default router;
