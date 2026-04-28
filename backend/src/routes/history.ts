import { Router } from 'express';
import { historyHandler } from '../controllers/historyController';

const router = Router();

router.get('/', historyHandler);

export default router;