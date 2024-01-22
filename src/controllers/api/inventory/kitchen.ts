import { format_error } from 'app/helpers/forms';
import Menu from 'app/models/Menu';
import { z } from 'zod';

const MenuItem = z.object({
    name: z.string().min(3).max(255)
});

type MenuItemParams = {
	id: string;
};

type MenuItemData = z.infer<typeof MenuItem>;

// GET /api/inventory/kitchen/menu
export const menu : Controller = () => async (req, res) => {
    const menu = await Menu.find({}).lean().exec().catch( e => console.log(e) );

    res.json({
        message: "Kitchen Menu",
        menu
    });
};

// GET /api/inventory/kitchen/menu/:id
export const menuItem: Controller = () => async (req, res) => {
    const { id } = req.params as MenuItemParams;
    const item = await Menu.findOne({ _id: id }).lean().exec().catch( e => console.log(e) );

    if (!item) return res.status(404).json({ message: "Item not found" });

    return res.json(item);
}

// POST /api/inventory/kitchen/menu/add
export const addMenuItem: Controller = () => async (req, res) => {
    const data = req.body as MenuItemData;

    // validate
    const validated = MenuItem.safeParse(data);

    if (!validated.success) {
        return res.json({
            errors: format_error(validated.error)
        });
    }

    const exists = await Menu.exists({ name: data.name });

    if (exists) {
        return res.json({
            errors: {
                name: ["Item already exists"]
            }
        });
    }

    try {
        const item = await Menu.create(data);
        const { _id, name } = item.toJSON();
        return res.json({
            status: "created",
            menu: {id: _id, name}
        });
    }
    catch (error) {
        const e = error as Error;
        return res.json({
            errors: e.message
        });
    }
}

// POST /api/inventory/kitchen/menu/edit/:id
export const editMenuItem: Controller = () => async (req, res) => {
	const { id } = req.params as { id: string };
    const data = req.body as MenuItemData;

	if (!id) {
		return res.status(400).json({
			errors: { id: ["Missing data."] },
		});
	}

	// validate
	const validated = MenuItem.safeParse(data);

	if (!validated.success) {
		return res.json({
			errors: format_error(validated.error),
		});
	}

	const item = await Menu.findOne({ _id: id }).exec().catch( (e: Error) => console.log(e.message) );

	if (!item) {
		return res.json({
			errors: {
				id: ["Item does not exist"],
			},
		});
	}

	try {
		item.set(data);
        await item.save();

		const { _id, name } = item.toJSON();

		return res.json({
            status: "updated",
			item: { _id, name },
		});
	} catch (error) {
		const e = error as Error;
		return res.json({
			errors: e.message,
		});
	}
};

// POST /api/inventory/kitchen/menu/delete/:id
export const deleteMenuItem: Controller = () => async (req, res) => {
	const { id } = req.params as { id: string };

	if (!id) {
		return res.status(400).json({
			errors: { id: ["Missing data."] },
		});
	}

	const item = await Menu.findOne({ _id: id }).exec().catch((e: Error) => console.log(e.message));

	if (!item) {
		return res.json({
			errors: {
				id: ["Item does not exist"],
			},
		});
	}

	try {
		const { _id, name } = item.toJSON();

        await item.deleteOne();

		return res.json({
			status: "deleted",
			item: { _id, name },
		});
	} catch (error) {
		const e = error as Error;
		return res.json({
			errors: e.message,
		});
	}
};