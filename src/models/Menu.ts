import { Schema, model, Model, Types } from 'mongoose';
import ItemModel from './Item';

type Menu = {
	name: string;
	procedure?: Procedure[];
	items?: string[];
};

type Procedure = {
    step: string;
}

type Item = {
	_id?: string;
	invalid_id?: boolean;
	name: string;
};

type MenuMethods = {
    getItems(): Promise<Item[]>
}

/**
 * Menu mongoose model
 */
const MenuSchema = new Schema<Menu, Model<Menu, Record<string, string>, MenuMethods>, MenuMethods>({
    name: String,
    procedure: [{
        step: String
    }],
    items: [String]
}, {
    methods: {
        getItems: async function() {

            if (!this.items) return [];

            const invalid_ids = [] as Item[];
            const ids = this.items?.reduce((acc: string[], id) => {
                if (!Types.ObjectId.isValid(id)) {
                    invalid_ids.push({
                        _id: id,
                        invalid_id: true,
                        name: `Invalid id: ${id}`
                    });
                }
                else {
                    acc.push(id)
                }
                return acc;
            }, []);
            const query = await ItemModel.find({ _id: { $in: ids } }).lean().exec().catch( e => console.log(e) );
            const items = [] as Item[];

            for (const item of (query || [])) {
                items.push({
                    _id: item._id.toString(),
                    name: item.name
                });
            }

            return [
                ...(items),
                ...invalid_ids
            ];
        }
    }
});

export default model('menus', MenuSchema);