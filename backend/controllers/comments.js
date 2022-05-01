const { Comments } = require('../models');

exports.getComments = async (req, res) => {
	const postId = req.params.postId;
	const comments = await Comments.findAll({
		order: [['updatedAt', 'DESC']],
		where: { PostId: postId },
	});
	res.json(comments);
};

exports.createComment = async (req, res) => {
	const comment = req.body;
	const username = req.user.username;
	comment.username = username;
	await Comments.create(comment).then((resP) => {
		console.log(resP);
		res.json(resP);
	});
};

exports.deleteComment = async (req, res) => {
	const commentId = req.params.commentId;
	await Comments.destroy({
		where: {
			id: commentId,
		},
	});
	res.json('Commentaire supprimé');
};
