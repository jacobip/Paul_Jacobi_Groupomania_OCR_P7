import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { ReactComponent as MiddleLogo } from '../logo/icon-left-matrix-double.svg';
import { useMediaQuery } from 'react-responsive';

function Home() {
	const [listOfPosts, setListOfPosts] = useState([]);
	const [likedPosts, setLikedPosts] = useState([]);

	let navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			navigate('/login');
		} else {
			axios
				.get('http://localhost:3001/posts', {
					headers: { accessToken: localStorage.getItem('accessToken') },
				})
				.then((response) => {
					setListOfPosts(response.data.listOfPosts);
					setLikedPosts(
						response.data.likedPosts.map((like) => {
							return like.PostId;
						})
					);
				});
		}
	}, [navigate]);

	const likeAPost = (postId) => {
		axios
			.post(
				'http://localhost:3001/likes',
				{ PostId: postId },
				{ headers: { accessToken: localStorage.getItem('accessToken') } }
			)
			.then((response) => {
				setListOfPosts(
					listOfPosts.map((post) => {
						if (post.id === postId) {
							if (response.data.liked) {
								return { ...post, Likes: [...post.Likes, 0] };
							} else {
								const likesArray = post.Likes;
								likesArray.pop();
								return { ...post, Likes: likesArray };
							}
						} else {
							return post;
						}
					})
				);

				if (likedPosts.includes(postId)) {
					setLikedPosts(
						likedPosts.filter((id) => {
							return id !== postId;
						})
					);
				} else {
					setLikedPosts([...likedPosts, postId]);
				}
			});
	};

	const isResponsive = useMediaQuery({ query: '(max-width: 768px)' });
	const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

	return (
		<div className="listofposts">
			{isResponsive && (
				<div className="introResponsive">
					{isResponsive && <MiddleLogo className="middleResponsive" />}
					{isDesktop && <MiddleLogo className="middle" />}
					<p>Les dernières publications des membres du réseau social Groupomania</p>
				</div>
			)}

			{isDesktop && (
				<div className="intro">
					{isResponsive && <MiddleLogo className="middleResponsive" />}
					{isDesktop && <MiddleLogo className="middle" />}
					<p>Les dernières publications des membres du réseau social Groupomania</p>
				</div>
			)}

			{listOfPosts.map((value, key) => {
				return (
					<div key={key} className="post">
						{isResponsive && (
							<div className="postResponsive">
								<div className="title">
									<Link to={`/profile/${value.UserId}`}>Publié par {value.username} </Link>
									{value.title}
								</div>
								<div
									className="bodyResponsive"
									onClick={() => {
										navigate(`/post/${value.id}`);
									}}
								>
									<p>{value.postText}</p>
								</div>
								<div
									className="imageResponsive"
									onClick={() => {
										navigate(`/post/${value.id}`);
									}}
								>
									{value.image !== null && (
										<img
											className="thumbnailResponsive"
											src={`http://localhost:3001/${value.image}`}
											alt="img from a post"
										/>
									)}
								</div>
								<div className="footer">
									<div className="likes">
										<ThumbUpAltIcon
											onClick={() => {
												likeAPost(value.id);
											}}
											className={likedPosts.includes(value.id) ? 'unlikeBttn' : 'likeBttn'}
										/>
										<label> {value.Likes.length}</label>
									</div>
									<div className="commIcon">
										<InsertCommentIcon
											onClick={() => {
												navigate(`/post/${value.id}`);
											}}
										/>
									</div>
								</div>
							</div>
						)}

						{isDesktop && (
							<div className="postDesktop">
								<div className="title">
									<Link to={`/profile/${value.UserId}`}>Publié par {value.username} </Link>
									{value.title}
								</div>
								<div
									className="bodyDesktop"
									onClick={() => {
										navigate(`/post/${value.id}`);
									}}
								>
									<p>{value.postText}</p>
								</div>
								<div
									className="image"
									onClick={() => {
										navigate(`/post/${value.id}`);
									}}
								>
									{value.image !== null && (
										<img
											className="thumbnail"
											src={`http://localhost:3001/${value.image}`}
											alt="img from a post"
										/>
									)}
								</div>
								<div className="footer">
									<div className="likes">
										<ThumbUpAltIcon
											onClick={() => {
												likeAPost(value.id);
											}}
											className={likedPosts.includes(value.id) ? 'unlikeBttn' : 'likeBttn'}
										/>
										<label> {value.Likes.length}</label>
									</div>
									<div className="commIcon">
										<InsertCommentIcon
											onClick={() => {
												navigate(`/post/${value.id}`);
											}}
										/>
									</div>
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}

export default Home;
