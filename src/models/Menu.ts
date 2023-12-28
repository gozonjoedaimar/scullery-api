import { Schema, model } from 'mongoose';

/**
 * Menu mongoose model
 */
const MenuSchema = new Schema({
    name: Schema.Types.String
});

export default model('menus', MenuSchema);