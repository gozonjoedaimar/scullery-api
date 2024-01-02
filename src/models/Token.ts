import mongoose, {Schema, Model, Document} from 'mongoose';

type Token = {
    token: string;
    email: string;
    date: Date;
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
});

export default mongoose.model<Token, TokenModel>('refreshtokens', TokenSchema);