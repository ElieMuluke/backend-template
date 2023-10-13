import {Request, Response, Router} from 'express';

const router = Router();

const statusCheck = (req: Request, res: Response) => {
	res.status(200).send(`🟢 OK, Server is up and running`);
	return;
}

router.get('/', statusCheck);

export default router;