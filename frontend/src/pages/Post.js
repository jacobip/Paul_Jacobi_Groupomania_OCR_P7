import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useMediaQuery } from 'react-responsive';

const initialValues = {
	comment: '',
};
const validationSchema = Yup.object().shape({
	comment: Yup.string().min(1).max(150).required(),
});

function Post() {
	let { id } = useParams();
	const [postObject, setPostObject] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState({ commentText: '', id: null });
	const { authState } = useContext(AuthContext);

	const adminRole = authState.role === 'admin';

	let navigate = useNavigate();

	useEffect(() => {
		axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
			setPostObject(response.data);
		});
		axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
			setComments(response.data);
		});
	}, [id]);

	const addComment = () => {
		const commentToCheck = newComment.commentText;
		if (commentToCheck === '') {
		} else {
			axios
				.post(
					'http://localhost:3001/comments',
					{
						commentBody: newComment.commentText,
						PostId: id,
					},
					{
						headers: {
							accessToken: localStorage.getItem('accessToken'),
						},
					}
				)
				.then((response) => {
					if (response.data.error) {
						console.log(response.data.error);
					} else {
						// console.log(response.data);
						const commentToAdd = {
							...response.data,
						};
						setComments([...comments, commentToAdd]);
						setNewComment({ commentText: '', id: null });
					}
				});
		}
	};

	const deleteComment = (id) => {
		axios
			.delete(`http://localhost:3001/comments/${id}`, {
				headers: { accessToken: localStorage.getItem('accessToken') },
			})
			.then(() => {
				setComments(
					comments.filter((val) => {
						return val.id !== id;
					})
				);
			});
	};

	const deletePost = (id) => {
		axios
			.delete(`http://localhost:3001/posts/${id}`, {
				headers: { accessToken: localStorage.getItem('accessToken') },
			})
			.then(() => {
				navigate('/');
			});
	};

	const isResponsive = useMediaQuery({ query: '(max-width: 768px)' });
	const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

	return (
		<Formik
			initialValues={initialValues}
			onClick={addComment}
			validationSchema={validationSchema}
		>
			<div className="singlePost">
				{isResponsive && (
					<div className="singlePostDesktop">
						<div className="singleTitleResponsive">{postObject.title}</div>
						<div
							className="singleBodyResponsive"
							onDoubleClick={() => {
								if (authState.username === postObject.username || adminRole === true) {
									navigate(`/profile/${id}`);
								}
							}}
						>
							<div className="singleImageResponsive">
								{postObject.image !== undefined && (
									<img
										className="singleThumbnailResponsive"
										src={`http://localhost:3001/${postObject.image}`}
										alt="img from a post"
									/>
								)}
								<p> {postObject.postText}</p>
							</div>
							<div className="commentSideResponsive">
								<div className="listOfCommentsResponsive">
									<p className="commentTitle">Commentaires</p>
									{comments.map((comment, key) => {
										return (
											<div key={key} className="commentResponsive">
												<label>{comment.username} a commenté</label>

												<p>{comment.commentBody}</p>

												{authState.username === comment.username || adminRole === true ? (
													<button
														className="smallBtn"
														onClick={() => {
															deleteComment(comment.id);
														}}
													>
														Supprimer le commentaire
													</button>
												) : (
													''
												)}
											</div>
										);
									})}
								</div>
								<div className="commentForm">
									<Form className="addCommentContainer">
										<Field
											className="commentField"
											as="textarea"
											name="comment"
											type="text"
											placeholder="Commentez ce message..."
											autoComplete="off"
											cols="50"
											rows="6"
											value={newComment.commentText}
											onChange={(event) => {
												setNewComment({ commentText: event.target.value, id: null });
											}}
										/>
									</Form>
									<button className="smallBtn" type="submit" onClick={addComment}>
										Commentez
									</button>
								</div>
								<div className="singleFooter">
									{postObject.username}
									{authState.username === postObject.username || adminRole === true ? (
										<button
											className="smallBtn"
											onClick={() => {
												deletePost(postObject.id);
											}}
										>
											Supprimer le message
										</button>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</div>
				)}
				{isDesktop && (
					<div className="singlePostDesktop">
						<div className="title">{postObject.title}</div>
						<div
							className="singleBodyDesktop"
							onDoubleClick={() => {
								if (authState.username === postObject.username || adminRole === true) {
									navigate(`/profile/${id}`);
								}
							}}
						>
							<div className="singleImage">
								{postObject.image !== undefined && (
									<img
										className="singleThumbnail"
										src={`http://localhost:3001/${postObject.image}`}
										alt="img from a post"
									/>
								)}
								<p> {postObject.postText}</p>
							</div>
							<div className="commentSide">
								<div className="listOfComments">
									<p className="commentTitle">Commentaires</p>
									{comments.map((comment, key) => {
										return (
											<div key={key} className="comment">
												<label>{comment.username} a commenté</label>

												<p>{comment.commentBody}</p>

												{authState.username === comment.username || adminRole === true ? (
													<button
														className="smallBtn"
														onClick={() => {
															deleteComment(comment.id);
														}}
													>
														Supprimer le commentaire
													</button>
												) : (
													''
												)}
											</div>
										);
									})}
								</div>
								<div className="commentForm">
									<Form className="addCommentContainer">
										<Field
											className="commentField"
											as="textarea"
											name="comment"
											type="text"
											placeholder="Commentez ce message..."
											autoComplete="off"
											cols="50"
											rows="6"
											value={newComment.commentText}
											onChange={(event) => {
												setNewComment({ commentText: event.target.value, id: null });
											}}
										/>
									</Form>
									<button className="smallBtn" type="submit" onClick={addComment}>
										Commentez
									</button>
								</div>
								<div className="singleFooter">
									{postObject.username}
									{authState.username === postObject.username || adminRole === true ? (
										<button
											className="smallBtn"
											onClick={() => {
												deletePost(postObject.id);
											}}
										>
											Supprimer le message
										</button>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</Formik>
	);
}

export default Post;
