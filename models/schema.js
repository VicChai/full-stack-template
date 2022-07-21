const mongoose = require('mongoose')
const testSchema = new mongoose.Schema({
    item1 : {
        type: String
    },
    item1 : {
        type: String
    }
})
module.exports = mongoose.model('TestModel', testSchema, 'test_connection')