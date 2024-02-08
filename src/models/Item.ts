import mongoose, { Schema } from 'mongoose';

type Item = {
    name: string;
}

const ItemSchema = new Schema<Item>({
    name: String
});

export default mongoose.model('items', ItemSchema);