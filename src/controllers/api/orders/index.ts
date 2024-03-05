import Order, { OrderModel } from "app/models/Order";
import { Types } from "mongoose";

type MenuIds = string[];

type MenuUpdateBody = {
    items: MenuIds | null;
}

type MenuUpdateParams = { id: string | null; }

/**
 * Order list
 * GET /api/orders
 */
export const orders: Controller = () => async (req, res) => {
    const dbQuery = Order.find();

    if (req.query?.q) {
        const query = req.query.q;
        dbQuery.where({ _id: { $in: [query] } });
    }

    const orders = await dbQuery.exec();
    const ordersList = orders.map(({ items, _id }) => ({ _id, items }));
    res.json({ message: 'Orders', orders: ordersList });
}

/**
 * Save Order
 */
async function saveOrder(order: OrderModel, body: MenuUpdateBody) {
    if (!body) {
        return false;
    }

    const { items } = body;

    order.items = items || [];

    return order.save();
}

/**
 * Add order
 * POST /api/orders/add
 */
export const add: Controller<MenuUpdateBody> = () => async (req, res) => {
    const { items } = req.body;

    if (!items?.length) {
        return res.status(400).json({
            message: 'Items are required'
        });
    }

    const order = new Order();

    const saved = await saveOrder(order, { items });

    return res.json({
        message: !!saved ? 'Order added' : 'Error adding order',
        order_id: order._id,
    });
}

/**
 * Edit order
 * POST /api/orders/edit/:id
 */
export const edit: Controller<MenuUpdateBody, MenuUpdateParams> = () => async (req, res) => {
    const { items } = req.body;
    const { id } = req.params;

    if (!Types.ObjectId.isValid(`${id}`)) {
        return res.status(400).json({
            error: true,
            message: "Invalid Id provided.",
        })
    }

    if (!items?.length) {
        return res.status(400).json({
            message: 'Items are required'
        });
    }

    const order = await Order.findOne({ _id: id }).exec();

    if (!order) {
        return res.json({
            error: true,
            message: "Item not found."
        })
    }

    const saved = await saveOrder(order, { items });

    return res.json({
        message: !!saved ? 'Order updated' : 'Error updating order',
        order_id: order._id,
    });
}

/**
 * Remove order
 * DELETE /api/orders/remove/:id
 */
export const remove: Controller<Record<string, unknown>, MenuUpdateParams> = () => async (req, res) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(`${id}`)) {
        return res.status(400).json({
            error: true,
            message: "Invalid Id provided.",
        })
    }

    const order = await Order.findOne({ _id: id }).exec();

    if (!order) {
        return res.json({
            error: true,
            message: "Item not found."
        })
    }

    await order.deleteOne();

    return res.json({
        message: 'Order removed',
        order: id
    });
}

/**
 * Order info
 * GET /api/order/:id
 */
export const order: Controller<null, MenuUpdateParams> = () => async (req, res) => {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(`${id}`)) {
        return res.status(400).json({
            error: true,
            message: "Invalid Id provided.",
        })
    }
    const order = await Order.findOne({ _id: id }).exec();

    if (!order) {
        return res.json({
            error: true,
            message: "Item not found."
        })
    }

    const { items, _id } = order.toJSON();

    return res.json({
        message: 'Order',
        order: { _id, items }
    });
}

export default orders;
