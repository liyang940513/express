var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/lagou', { useMongoClient: true });
mongoose.Promise = global.Promise;


module.exports = mongoose;