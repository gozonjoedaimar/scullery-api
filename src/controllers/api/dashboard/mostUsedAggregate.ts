import { PipelineStage } from "mongoose";

const mostUsedAggregate: PipelineStage[] = [
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
    {
        $unwind: {
            path: "$menu.items",
        },
    },
    {
        $group: {
            _id: "$menu.items",
            count: {
                $sum: 1,
            },
            id: {
                $first: "$menu.items",
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
            from: "items",
            localField: "id",
            foreignField: "_id",
            as: "item",
        },
    },
    {
        $unwind: {
            path: "$item",
        },
    },
    {
        $sort: {
            count: -1,
        },
    },
    {
        $limit: 5,
    },
];

export default mostUsedAggregate;
