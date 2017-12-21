var mongoose = require('mongoose');
const DB_URL = 'mongodb://127.0.0.1:27017/nuwed';

var connection = null;
exports.connect = function() {
    if (!connection) {
        try {
            mongoose.Promise = global.Promise;
            return connection = mongoose.connect (DB_URL , (err) => {
                if (err) console.error(err.name, ' : ', err.message);
                else console.log('Database connected.');
            });
        } catch (err) {
            console.log(err);
        }
    }

    return connection;
};