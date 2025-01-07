import { Router } from "express";
import { APIError, asyncHandler } from "../Middlewares/errorHandler.js";

const router = Router();

const item = [
    {
        id: 1,
        name: 'item1',
        price: 100
    },
    {
        id: 2,
        name: 'item2',
        price: 200
    },
    {
        id: 3,
        name: 'item3',
        price: 300
    },
    {
        id: 4,
        name: 'item4',
        price: 400
    }
];

router.get('/items', asyncHandler(async (req, res) => {
    res.status(200).json({ status: 200, data: item });
}));

router.post('/item', asyncHandler(async (req, res) => {
    if (!req.body.name) {
        throw new APIError('Item name is required', 400);
    }

    const newItem = {
        id: item.length + 1,
        name: req.body.name,
        price: req.body.price
    }

    item.push(newItem);
    res.status(201).json({ status: 201, data: newItem });
}))

export default router;