import mongoose, {Schema} from 'mongoose';

type Token = {
    token: string;
    email: string;
    date: Date;
    type: 'refresh' | 'access';
};

const TokenSchema = new Schema<Token>({
    token: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    date: {
        type: Date,
        require: true,
        default: Date.now()
    },
    type: {
        type: String,
        require: true,
        default: 'refresh'
    }
});

export default mongoose.model('tokens', TokenSchema);