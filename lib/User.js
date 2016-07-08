var mongoose = require('mongoose');

var userschema = new mongoose.Schema({
    username: {type: String, unique: true},
    password: {type: String},
    firstname: String,
    lastname: String
});

var User = mongoose.model('myuser',userschema);
module.export = User;