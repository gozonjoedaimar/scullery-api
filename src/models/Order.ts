import { Document, Schema, model } from "mongoose";

type Order = {
    date_open: Date;
    date_closed: Date;
    items: string[];
}

const orderSchema = new Schema<Order>({
    date_open: Date,
    date_closed: Date,
    items: [String]
});

export type OrderModel = Order & Document;

export default model('orders', orderSchema);