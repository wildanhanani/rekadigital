const express = require('express');
const filmController = require('../controller/film');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/tittle/create', auth.authUser, filmController.createTittle);
router.post('/tittle/update', auth.authUser, filmController.updateTittle);
router.post('/tittle/delete', auth.authUser, filmController.deleteTittle);
router.get('/tittle/list', auth.authUser, filmController.findTittle);
router.get('/tittle/list/detail', auth.authUser, filmController.findById);

module.exports = router;
