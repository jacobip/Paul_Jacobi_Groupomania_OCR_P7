const express = require('express');
const router = express.Router();
const { validateToken } = require('../middlewares/AuthMiddleware');

const userCtrl = require('../controllers/users');

router.post('/', userCtrl.createUser);

router.delete('/deleteuser/:id', validateToken, userCtrl.deleteUser);

router.post('/login', userCtrl.login);

router.get('/auth', validateToken, userCtrl.getUser);

router.get('/basicinfo/:id', userCtrl.getProfile);

router.put('/changepassword/:id', validateToken, userCtrl.modifyPassword);

module.exports = router;
