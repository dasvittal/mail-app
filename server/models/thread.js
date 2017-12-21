const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
    id: String,
    historyId: String ,
    messages: []
});


module.exports = mongoose.model('Thread', ThreadSchema);



/*
{
    id: String,
    threadId: String,
    labelIds: [Schema.Types.ObjectId],
    snippet: String,
    historyId: String,
    internalDate: String,
    payload: [{
        'partId': String,
        'mimeType': String,
        'filename': String,
        'headers': [{
            'name': String,
            'value': String
            }]
        }],
    sizeEstimate: Number
}

*/