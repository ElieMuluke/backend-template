import { Router } from 'express';
import {statusCheck} from '../controllers/status.controller';

const router = Router();

router.get('/', statusCheck);

export default router;