const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserTokenSchema = new Schema({
    code : { type: String, trim: true},
    tokens: {
        access_token: { type: String},
        id_token: { type: String},
        token_type: { type: String},
        expiry_date: { type: Number}
    }
});


module.exports = mongoose.model('UserToken', UserTokenSchema);