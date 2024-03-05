import { format_error } from 'app/helpers/forms';
import Menu from 'app/models/Menu';
import { Types } from 'mongoose';
import { z } from 'zod';

type ProcedureData = {
	step: string;
};

// Menu item request schema
const MenuItem = z.object({
    name: z.string().min(3).max(255),
	procedure: z.string().min(3).array().optional(),
	items: z.string().min(3).array().optional()
});

type MenuItemData = z.infer<typeof MenuItem>;

type MenuData = {
	_id?: string;
	name: string;
	procedure?: ProcedureData[];
	items?: string[];
};

type MenuItemParams = {
	id: string;
};

// GET /api/menu
export const menu : Controller = () => async (req, res) => {
    const menu = await Menu.find({}).lean().exec().catch( e => console.log(e) );
	const list = [];
	
	if (menu) {
		for (const item of menu) {
			const { _id, name } = item;
			list.push({ 
				_id: _id.toString(),
				name,
			});
		}
	}

    res.json({
        message: "Kitchen Menu",
        menu: list
    });
};

// GET /api/menu/:id
export const menuItem: Controller<Object, MenuItemParams> = () => async (req, res) => {
    const { id } = req.params;

	if (id && !Types.ObjectId.isValid(id)) {
		return res.status(400).json({ message: "Invalid id" });
	}

    const item = await Menu.findOne({ _id: id }).exec().catch( e => console.log(e) );

    if (!item) return res.status(404).json({ message: "Item not found" });

	const data = {
		_id: item._id.toString(),
		name: item.name,
		procedure: item.procedure || [],
		items: await item.getItems()
	};

    return res.json(data);
}

function processIngredients(ingredients: string[]) {
	return ingredients.filter( item => item.trim().length > 0 );
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
export const addMenuItem: Controller<MenuItemData> = () => async (req, res) => {
    const data = req.body;

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

		if (data.items) {
			menu.items = processIngredients(data.items);
		}

        const item = await Menu.create(menu);
        const { _id, name, procedure } = item.toJSON();
        return res.json({
            status: "created",
            menu: {
				id: _id.toString(),
				name,
				procedure,
				items: await item.getItems()
			}
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
export const editMenuItem: Controller<MenuItemData, { id: string }> = () => async (req, res) => {
	const { id } = req.params;
    const data = req.body;

	if (!id) {
		return res.status(400).json({
			errors: { id: ["Missing data."] },
		});
	}

	// NOTE: make name optional for update
	// validate
	// const validated = MenuItem.safeParse(data);

	// if (!validated.success) {
	// 	return res.json({
	// 		errors: format_error(validated.error),
	// 	});
	// }

	const item = await Menu.findOne({ _id: id }).exec().catch( (e: Error) => console.log(e.message) );

	if (!item) {
		return res.json({
			errors: {
				id: ["Item does not exist"],
			},
		});
	}

	try {
		const menu = {} as MenuData;

		if (data.name) {
			menu.name = data.name;
		}

		if (data.procedure) {
			menu.procedure = processProcedures(data.procedure);
		}

		if (data.items) {
			menu.items = processIngredients(data.items);
		}

		item.set(menu);
		await item.save();

		const { _id, name, procedure } = item.toJSON();

		return res.json({
			status: "updated",
			item: { _id, name, procedure, items: await item.getItems() },
		});
	} catch (error) {
		const e = error as Error;
		return res.json({
			errors: e.message,
		});
	}
};

// POST /api/menu/delete/:id
export const deleteMenuItem: Controller<Object, { id: string }> = () => async (req, res) => {
	const { id } = req.params;

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