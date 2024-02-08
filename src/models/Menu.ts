import { Schema, model, Model } from 'mongoose';

type Menu = {
	name: string;
	procedure?: Procedure[];
	items?: Item[];
};

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
    name: String,
    procedure: [{
        step: String
    }],
    items: [{
        name: String
    }]
});

export default model('menus', MenuSchema);