const express = require('express');
const router = express.Router();

const postsCtrl = require('../controllers/posts');
const { validateToken } = require('../middlewares/AuthMiddleware');
const { upload } = require('../middlewares/multer-config');

router.get('/', validateToken, postsCtrl.getAllPosts);

router.get('/byId/:id', postsCtrl.getIdPosts);

router.get('/byuserId/:id', postsCtrl.getAllIdPosts);

router.put('/:id', validateToken, upload, postsCtrl.modifyPosts);

router.post('/', validateToken, upload, postsCtrl.createPosts);

router.delete('/:postId', validateToken, postsCtrl.deletePosts);

module.exports = router;
