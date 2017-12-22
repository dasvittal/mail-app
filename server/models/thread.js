const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Message = new Schema({
    id: { type: String, trim: true},
    threadId: { type: String, trim: true},
    labelIds: [{ type: String }],
    snippet: { type: String, trim: true},
    historyId: { type: String, trim: true},
    internalDate: { type: String, trim: true},
    // payload: [{
    //     'partId': { type: String, trim: true},
    //     'mimeType': { type: String, trim: true},
    //     'filename': { type: String, trim: true},
    //     'headers': [{
    //         'name': { type: String, trim: true},
    //         'value': { type: String, trim: true}
    //         }]
    //     }],
    sizeEstimate: {type: Number}
});

const ThreadSchema = new Schema({
    id: { type: String, trim: true},
    historyId: { type: String, trim: true} ,
    messages: [Message]
});


module.exports = mongoose.model('Thread', ThreadSchema);
