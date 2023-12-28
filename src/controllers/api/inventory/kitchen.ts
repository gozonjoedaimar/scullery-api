import { type Request, type Response } from 'express';
import Menu from '@/models/Menu';

type Controller = () => (req: Request, res: Response) => void;

// GET /api/inventory/kitchen/menu
export const menu : Controller = () => async (req, res) => {
    const menu = await Menu.find({}).lean().exec().catch( e => console.log(e) );

    res.json({
        message: "Kitchen Menu",
        menu
    });
};