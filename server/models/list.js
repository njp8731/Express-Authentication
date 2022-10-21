let mongoose = require('mongoose');
let contactModel = mongoose.Schema ({
    username: String,
    email: String,
    password: String
},
 {
    collection: "user"
 });

 module.exports = mongoose.model('contact', contactModel);