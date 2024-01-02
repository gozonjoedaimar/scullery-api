import mongoose, {Schema, Model, Document} from 'mongoose';

type Token = {
    token: string;
    email: string;
    date: Date;
    type: 'refresh' | 'access';
} & Document;

type TokenModel = Model<Token>;

const TokenSchema: Schema = new Schema<Token, TokenModel>({
    token: {
        type: Schema.Types.String,
        require: true,
    },
    email: {
        type: Schema.Types.String,
        require: true,
    },
    date: {
        type: Schema.Types.Date,
        require: true,
        default: Date.now()
    },
    type: {
        type: Schema.Types.String,
        require: true,
        default: 'refresh'
    }
});

export default mongoose.model<Token, TokenModel>('tokens', TokenSchema);