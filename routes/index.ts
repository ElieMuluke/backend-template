import { Router } from 'express';
import {statusCheck} from '../controllers/status.controller';

const router = Router();

router.get('/status', statusCheck);

export default router;