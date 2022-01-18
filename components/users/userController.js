const { signAccessToken } = require('../../middlewares/authJwt');
const Account = require('../users/AccountModel');

const user= require('./index');

exports.login= async(req,res)=>{
    res.render('users/login');
}

exports.register= async(req,res)=>{
    res.render('users/register');
}

exports.profile= async(req,res)=>{
    res.render('users/accounts');
}
exports.submitLogin = async(req,res, next)=>{
    try {
        const { email, password } = req.body;
        const account = await Account.findOne({
            email: email
        });
        if (!account) {
            throw createError('Email không chính xác');
        }
        const isValid = await account.isCheckPassword(password);
        if (!isValid) {
            throw createError('Sai mật khẩu');
        }
        const user = await User.findOne({ email: email })
        const accessToken = await signAccessToken(user._id);
        if (!accessToken) {
            throw createError('Đăng nhập không thành công, bạn vui lòng thử lại');
        }
        res.cookie('access_token', accessToken, { httpOnly: true });
        res.redirect('/');
    }
    catch (error) {
        next(error);
    }
}
exports.Logout = async (req,res,next) => {
    res.clearCookie('access_token').redirect('/users/login');
}