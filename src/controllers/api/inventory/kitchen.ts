import { type Request, type Response } from 'express';
import { route } from '@/routes/api'

type Controller = () => (req: Request, res: Response) => void;

// GET /api/inventory/kitchen
export const index : Controller = () => (req, res) => {
    res.json({
        message: "Kitchen API",
        route: route('inventory-kitchen').get()
    });
}

// GET /api/inventory/kitchen/menu
export const menu : Controller = () => (req, res) => {
    res.json({
        message: "Kitchen Menu"
    });
}

// GET /api/inventory/kitchen/menu/item
export const item: Controller = () => (req, res) => {
	res.json({
		message: "Kitchen Item",
	});
};

// GET /api/version
export const version: Controller = () => (req, res) => {
    res.json({
        version:"v1"
    });
}