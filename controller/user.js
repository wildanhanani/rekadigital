const bcrypt = require('bcrypt');
const User = require('../model/User');

const { respone_ok_data, validasi, data_notfound } = require('../helper/http_response');

exports.createuser = async (req, res, next) => {
  try {
    const { username, password, status } = req.body;
    const finduser = await User.findOne({ username: username.toLowerCase() });

    if (finduser) {
      validasi(res, 'username already exist');
    }
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = await new User({
      username: username,
      password: passwordHash,
      status: status,
    }).save();
    respone_ok_data(res, 'Data succesfully inputed', user);
  } catch (error) {
    next(error);
  }
};
