const express = require('express');
const userController = require('../controller/user');

const router = express.Router();

router.post('/create', userController.createuser);

module.exports = router;
