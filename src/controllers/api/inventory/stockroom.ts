import { type Request, type Response } from 'express';

type Controller = () => (req: Request, res: Response) => void;

// GET /api/inventory/stockroom
export const index : Controller = () => (req, res) => {
    res.json({
        message: "Stockroom API"
    });
}

export default {
    index
}