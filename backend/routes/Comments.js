const express = require('express');
const router = express.Router();

const commentsCtrl = require('../controllers/comments');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/:postId', commentsCtrl.getComments);

router.post('/', validateToken, commentsCtrl.createComment);

router.delete('/:commentId', validateToken, commentsCtrl.deleteComment);

module.exports = router;
