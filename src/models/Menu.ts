import { Schema, model, Model } from 'mongoose';

type Menu = {
    name: string;
    procedures?: Procedure[];
    items?: Item[];
}

type Procedure = {
    step: string;
}

type Item = {
    name: string;
}

/**
 * Menu mongoose model
 */
const MenuSchema = new Schema<Menu, Model<Menu>>({
    name: String
});

export default model('menus', MenuSchema);