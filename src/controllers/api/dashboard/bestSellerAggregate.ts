import { PipelineStage } from "mongoose";

const bestSellerAggregate: PipelineStage[] = [
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
        },
    },
];

export default bestSellerAggregate;