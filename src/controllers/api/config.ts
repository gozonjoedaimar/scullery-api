import { type Request, type Response } from "express";

type Controller = () => (req: Request, res: Response) => void;

// GET /api/version
export const version: Controller = () => (req, res) => {
	res.json({
		version: "v1",
	});
};