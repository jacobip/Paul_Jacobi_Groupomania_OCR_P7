//import React, { useContext } from "react";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import { ReactComponent as MiddleLogo } from '../logo/icon-left-matrix-double.svg';

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

	return (
		<div className="listofposts">
			<div className="intro">
				<MiddleLogo className="middle" />
			</div>
			<p>Les dernières publications des membres du réseau social Groupomania</p>
			{listOfPosts.map((value, key) => {
				return (
					<div key={key} className="post">
						<div className="title">
							<Link to={`/profile/${value.UserId}`}>Publié par {value.username} </Link>
							{value.title}
						</div>
						<div
							className="body"
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
				);
			})}
		</div>
	);
}

export default Home;
