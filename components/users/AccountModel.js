const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcryptjs');
const Account = new Schema({
   email: { type: String, default: '' },
   password: { type: String, default: '' },
   role:{type: String, default:'user'},
   loginAt: { type: Date, default: Date.now },
   logoutAt: { type: Date, default: Date.now },
});
Account.plugin(mongooseDelete, {
   deleteAt: true,
   overrideMethods: 'all'
});
Account.pre('save', async function (next) {
   try {
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(this.password, salt);
      this.password = hashpassword;
      next();
   }
   catch(error) {
      next(error);
   }
})
Account.methods.isCheckPassword = async function (password) {
   try {
      return await bcrypt.compare(password, this.password);
   }
   catch (error) {
      next(error);
   }
}
module.exports = mongoose.model('Account', Account)