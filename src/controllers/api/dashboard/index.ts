import Order from "app/models/Order";
import { PipelineStage } from "mongoose";

const bestSellerAggregate:PipelineStage[]= [
    {
        $unwind: {
            path: "$items",
        },
    },
    {
        $group: {
            _id: "$items",
            count: {
                $sum: 1,
            },
            id: {
                $first: "$items",
            },
        },
    },
    {
        $project: {
            _id: false,
            count: true,
            id: {
                $toObjectId: "$id",
            },
        },
    },
    {
        $lookup: {
            from: "menus",
            localField: "id",
            foreignField: "_id",
            as: "menu",
        },
    },
    {
        $unwind: {
            path: "$menu",
        },
    },
    {
        $limit: 5,
    },
    {
        $sort: {
            count: -1,
        }
    }
];

type OrderInfo = {
    count:number;
    id:string;
    menu: {
        name: string;
    }
}

export const bestSeller: Controller = () => async (req, res) => {
    const q = Order.aggregate(bestSellerAggregate);

    const bestSeller: OrderInfo[] = await q.exec().catch(e => console.log(e)) || [];
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
        menus: list,
    });
};
