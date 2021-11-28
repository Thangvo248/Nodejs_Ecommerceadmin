

exports.login= async(req,res)=>{
    res.render('users/login');
}

exports.register= async(req,res)=>{
    res.render('users/register');
}

exports.profile= async(req,res)=>{
    res.render('users/profile');
}