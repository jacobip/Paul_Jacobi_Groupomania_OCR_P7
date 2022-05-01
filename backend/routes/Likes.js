const express = require('express');
const router = express.Router();

const likesCtrl = require('../controllers/likes');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post('/', validateToken, likesCtrl.createLike);

module.exports = router;
