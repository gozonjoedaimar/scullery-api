// GET /api/version
export const version: Controller = () => (req, res) => {
	res.json({
		version: "v1",
	});
};