import Menu from 'app/models/Menu';

// GET /api/inventory/kitchen/menu
export const menu : Controller = () => async (req, res) => {
    const menu = await Menu.find({}).lean().exec().catch( e => console.log(e) );

    res.json({
        message: "Kitchen Menu",
        menu
    });
};

type MenuItemParams = {
    id: string;
}

export const menuItem: Controller = () => async (req, res) => {
    const { id } = req.params as MenuItemParams;
    const item = await Menu.findOne({ _id: id }).lean().exec().catch( e => console.log(e) );

    if (!item) return res.status(404).json({ message: "Item not found" });

    return res.json(item);
}