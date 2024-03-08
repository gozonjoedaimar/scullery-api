import Order from "app/models/Order";
import bestSellerAggregate from "./bestSellerAggregate";
import mostUsedAggregate from "./mostUsedAggregate";

type OrderInfo = {
    count: number;
    id: string;
    menu: {
        name: string;
    };
};
type ItemInfo = {
    count: number;
    id: string;
    item: {
        name: string;
    };
};

/**
 * Best seller controller
 */
export const bestSeller: Controller = () => async (req, res) => {
    const total_orders = await Order.countDocuments();
    const q = Order.aggregate(bestSellerAggregate);

    const bestSeller: OrderInfo[] =
        (await q.exec().catch((e) => console.log(e))) || [];
    const list = [];
    if (!!bestSeller?.length) {
        for (const item of bestSeller) {
            list.push({
                count: item.count,
                // id: item.id,
                name: item.menu.name,
            });
        }
    }

    return res.status(200).json({
        total_orders,
        menus: list,
    });
};

/**
 * Most used controller
 */
export const mostUsed: Controller = () => async (req, res) => {
    const q = Order.aggregate(mostUsedAggregate);

    const mostUsed: ItemInfo[] =
        (await q.exec().catch((e) => console.log(e))) || [];
    const list = [];
    if (!!mostUsed?.length) {
        for (const item of mostUsed) {
            list.push({
                count: item.count,
                // id: item.id,
                name: item.item.name,
            });
        }
    }

    const total_used = list.reduce((acc, cur) => acc + cur.count, 0);

    return res.status(200).json({
        items: list,
        total_used,
    });
};
