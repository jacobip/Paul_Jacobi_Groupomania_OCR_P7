const { Posts, Likes } = require('../models');

exports.getAllPosts = async (req, res) => {
	const listOfPosts = await Posts.findAll({
		order: [['updatedAt', 'DESC']],
		include: [Likes],
	});
	const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
	res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
};

exports.getIdPosts = async (req, res) => {
	const id = req.params.id;
	const post = await Posts.findByPk(id);
	res.json(post);
};

exports.getAllIdPosts = async (req, res) => {
	const id = req.params.id;
	const listOfPosts = await Posts.findAll({
		order: [['updatedAt', 'DESC']],
		where: { UserId: id },
		include: [Likes],
	});
	res.json(listOfPosts);
};

exports.modifyPosts = async (req, res) => {
	console.log('upload images');
	const postid = req.params.id;
	const post = req.body;
	post.username = req.user.username;
	post.UserId = req.user.id;
	post.image = req.file?.path;

	await Posts.update(post, {
		where: {
			id: postid,
		},
	})
		.then(() => {
			res.status(200).json('Post modifié avec succès');
		})
		.catch((err) => res.status(400).json(err.response));
};

exports.createPosts = async (req, res) => {
	const post = req.body;
	post.username = req.user.username;
	post.UserId = req.user.id;
	post.image = req.file?.path;
	await Posts.create(post)
		.then(() => {
			res.status(200).json(post);
		})
		.catch((err) => res.status(400).json(err.response));
};

exports.deletePosts = async (req, res) => {
	const postId = req.params.postId;
	await Posts.destroy({
		where: {
			id: postId,
		},
	});
	res.json('Post supprimé!');
};
