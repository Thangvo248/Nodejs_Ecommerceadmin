
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');


const User = new Schema({
   name: { type: String, },
   phone: { type: Number, },
   email: { type: String, },
   gender: { type: String, },
   dateofbirth: { type: Date, default: '10/10/2010' },
   profession: { type: String, },
   avatar: { type: String, default: 'https://res.cloudinary.com/none-ptudw/image/upload/v1642413312/trend-avatar-1_ilvcbx.jpg' },
   address: { type: String, },
   loginAt: { type: Date, default: Date.now },
   logoutAt: { type: Date, default: Date.now },
   roles: { type: String, default: 'User' },
});
User.plugin(mongooseDelete, {
   deleteAt: true,
   overrideMethods: 'all'
});
module.exports = mongoose.model('User', User)