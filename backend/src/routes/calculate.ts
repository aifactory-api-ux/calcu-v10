import { Router } from 'express';
import { calculateHandler } from '../controllers/calculateController';

const router = Router();

router.post('/', calculateHandler);

export default router;