// GET /api/inventory/item
export const index: Controller = () => (req, res) => {
	res.json({
		message: "Inventory Item API",
	});
};