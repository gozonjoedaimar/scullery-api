// GET /api/inventory/kitchen
export const index: Controller = () => (req, res) => {
	res.json({
		message: "Kitchen API",
	});
};