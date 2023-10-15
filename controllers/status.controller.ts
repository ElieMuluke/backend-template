import {Request, Response, Router} from 'express';

const statusCheck = (req: Request, res: Response) => {
	res.status(200).send(`🟢 OK, Server is up and running`);
	return;
}

export {statusCheck};
