// GET /api/inventory/stockroom
export const index : Controller = () => (req, res) => {
    res.json({
        message: "Stockroom API"
    });
}