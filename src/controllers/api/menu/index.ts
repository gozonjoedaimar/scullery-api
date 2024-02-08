import { format_error } from 'app/helpers/forms';
import Menu from 'app/models/Menu';
import { z } from 'zod';

type ProcedureData = {
	step: string;
};

// Menu item request schema
const MenuItem = z.object({
    name: z.string().min(3).max(255),
	procedure: z.string().min(3).array().optional(),
});

type MenuItemData = z.infer<typeof MenuItem>;

type MenuData = {
	name: string;
	procedure?: ProcedureData[];
};

type MenuItemParams = {
	id: string;
};

// GET /api/menu
export const menu : Controller = () => async (req, res) => {
    const menu = await Menu.find({}).lean().exec().catch( e => console.log(e) );

    res.json({
        message: "Kitchen Menu",
        menu
    });
};

// GET /api/menu/:id
export const menuItem: Controller = () => async (req, res) => {
    const { id } = req.params as MenuItemParams;
    const item = await Menu.findOne({ _id: id }).lean().exec().catch( e => console.log(e) );

    if (!item) return res.status(404).json({ message: "Item not found" });

    return res.json(item);
}

function processProcedures(procedures: string[]): ProcedureData[] {
	try{
		const data = procedures.filter( step => step.trim().length > 0 );
		const steps = [] as ProcedureData[];
		for (let i = 0; i < data.length; i++) {
			const step = data[i];
			steps.push({step});
		}
		return steps;
	} catch (error) {
		console.log((error as Error).message);
		return [];
	}
}

// POST /api/menu/add
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
		const menu: MenuData = { name: data.name }

		if (data.procedure) {
			menu.procedure = processProcedures(data.procedure);
		}

        const item = await Menu.create(menu);
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

// POST /api/menu/edit/:id
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
		const menu: MenuData = { name: data.name };

		if (data.procedure) {
			menu.procedure = processProcedures(data.procedure);
		}

		item.set(menu);
		await item.save();

		const { _id, name, procedure } = item.toJSON();

		return res.json({
			status: "updated",
			item: { _id, name, procedure },
		});
	} catch (error) {
		const e = error as Error;
		return res.json({
			errors: e.message,
		});
	}
};

// POST /api/menu/delete/:id
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