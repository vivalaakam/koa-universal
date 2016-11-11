import Router from 'koa-router';
import webhook from '../controllers/webhook';

const router = new Router();
router
  .post('/telegram', webhook.telegram);

export default router;
