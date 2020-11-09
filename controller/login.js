const JWT = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../model/User');

const JWTsecret = process.env.JWT_KEY;
const { data_notfound, authorized, respone_ok_data } = require('../helper/http_response');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const login = await User.findOne({ username: username });
    if (!login) {
      return data_notfound(res, 'username not found');
    }
    const compare = bcrypt.compareSync(password, login.password);
    if (!compare) {
      return authorized(res, 'password not match');
    }
    const token = JWT.sign({ _id: login._id }, JWTsecret, { expiresIn: '24h' });
    respone_ok_data(res, 'succes login', { token_type: 'Bearer', expiresIn: '24 hours', acces_token: token });
  } catch (error) {
    next(error);
  }
};
