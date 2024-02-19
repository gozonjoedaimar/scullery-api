import Item from 'app/models/Item';
import { Types } from 'mongoose';

// GET /api/inventory/item
export const index: Controller = () => async (req, res) => {
	const find = {} as { name?: RegExp };

	if ('q' in req.query) {
		const search = req.query.q as string;
		find.name = new RegExp(search, 'i');
	}

	const items = await Item.find(find).lean().exec().catch( e => e );

	if (items instanceof Error) {
		return res.status(500).json({
			message: items.message,
		});
	}

	return res.json({
		message: "Inventory Item API",
		items,
		query: req.query
	});
};

// GET /api/inventory/item/:id
export const item: Controller = () => async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({
			message: "Missing ID",
		});
	}

	if (!Types.ObjectId.isValid(id)) {
		return res.status(400).json({
			message: "Invalid ID",
		});
	}

	const items = await Item.find({ _id: id }).lean().exec().catch( e => e );

	if (items instanceof Error) {
		return res.status(500).json({
			message: items.message,
		});
	}

	return res.json({
		message: "Inventory Item API",
		items,
	});
};