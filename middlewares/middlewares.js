
const User = require('../components/users/userModel');


const checkUser = async (req, res, next) => {
  try {
    const user = await User.findOne(req.payload);
    const role = user.role;
    if (role === 'User' || role === 'Admin') {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const checkAdmin = async (req, res, next) => {
  try {
    const role = req.body.role;
    if (role === 'Admin') {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUser, checkAdmin }