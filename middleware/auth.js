const JWT = require('jsonwebtoken');
const User = require('../model/User');

const JWTsecret = process.env.JWT_KEY;
const { forbidden, validasi_data, data_notfound } = require('../helper/http_response');

exports.authUser = async (req, res, next) => {
  try {
    const headers = req.headers.authorization;
    if (!headers) {
      return forbidden(res, 'please provide token');
    }

    const token = headers.split(' ')[1];
    const decode = JWT.verify(token, JWTsecret);
    req.user = decode;

    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      return data_notfound(res, 'User not found');
    }
    next();
  } catch (error) {
    return validasi_data(res, 'validation error', error.message);
  }
};
