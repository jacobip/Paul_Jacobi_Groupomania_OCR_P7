const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');

const app = express();

app.use(
	helmet({
		crossOriginResourcePolicy: false,
	})
);

const normalizePort = (val) => {
	const port = parseInt(val, 10);

	if (isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
};

const port = normalizePort(process.env.PORT || '3001');
const cors = require('cors');

app.use(logger);
app.use(express.json());
app.use(cors());

const db = require('./models');

//ORM sequelize
db.sequelize
	.sync()
	.then(() => {
		app.listen(3001, () => {
			console.log('Serveur en marche sur le port 3001');
		});
	})
	.catch((err) => {
		console.log(err);
	});
//ORM sequelize

const limiter = rateLimit({
	windowMs: 60 * 60 * 1000,
	max: 100,
	message: 'Too many request from this IP, please try again in an hour',
});

app.use(xss());

// Routers
const postRouter = require('./routes/Posts');
app.use('/posts', postRouter);
const commentsRouter = require('./routes/Comments');
app.use('/comments', commentsRouter);
const usersRouter = require('./routes/Users');
app.use('/auth', limiter, usersRouter);
const likesRouter = require('./routes/Likes');
app.use('/likes', likesRouter);
app.use('/images', express.static('./images'));

function logger(req, res, next) {
	console.log('originalUrl : ' + req.originalUrl);
	next();
}
