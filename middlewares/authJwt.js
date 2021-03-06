const jwt = require("jsonwebtoken");
const signAccessToken = async (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {
      userId
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: '1y'
    }
    jwt.sign(payload, secret, options, (err, token) => {
      if (err) reject(err)
      resolve(token);
    });
  })

};
const verifyAccessToken = async (req, res, next) => {
  const token = req.cookies.access_token;
    if (!token) {
      throw res.status(409).send('Bạn chưa đăng nhập');
    }
    var payload= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      req.payload=payload;
      next();
};

module.exports = {
  signAccessToken, verifyAccessToken
}