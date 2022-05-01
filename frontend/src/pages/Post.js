import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../helpers/AuthContext';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

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
	// console.log(adminRole);

	let navigate = useNavigate();

	useEffect(() => {
		axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
			console.log(response.data);
			setPostObject(response.data);
		});
		axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
			setComments(response.data);
		});
	}, [id]);

	const addComment = () => {
		const commentToCheck = newComment.commentText;
		//console.log(commentToCheck);
		if (commentToCheck === '') {
			//console.log("nocomment");
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

	return (
		<Formik
			initialValues={initialValues}
			onClick={addComment}
			validationSchema={validationSchema}
		>
			<div className="postPage">
				<div className="leftSide">
					<div className="post postComment" id="individual">
						<div className="title">{postObject.title}</div>

						<div
							className="body"
							onDoubleClick={() => {
								if (authState.username === postObject.username || adminRole === true) {
									navigate(`/updatepost/${id}`);
								}
							}}
						>
							{' '}
							<div>
								{postObject.image !== null && (
									<img
										className="thumbnail"
										src={`http://localhost:3001/${postObject.image}`}
										alt="img from a post"
									/>
								)}
								<p> {postObject.postText}</p>
							</div>
						</div>
						<div className="footer">
							from {postObject.username}
							{authState.username === postObject.username || adminRole === true ? (
								<button
									className="smallBtn"
									onClick={() => {
										deletePost(postObject.id);
									}}
								>
									{' '}
									Supprimez le message
								</button>
							) : (
								''
							)}
						</div>
					</div>
				</div>
				<div className="rightSide">
					<Form className="addCommentContainer">
						<Field
							as="textarea"
							name="comment"
							type="text"
							placeholder="Commentez ce message..."
							autoComplete="off"
							cols="30"
							rows="3"
							value={newComment.commentText}
							onChange={(event) => {
								setNewComment({ commentText: event.target.value, id: null });
							}}
						/>
						<button type="submit" onClick={addComment}>
							Envoyez votre commentaire
						</button>
					</Form>
					<div className="listOfComments">
						<ErrorMessage className="easyComment" name="comment" component="span" />
						{comments.map((comment, key) => {
							return (
								<div key={key} className="comment">
									<p>{comment.commentBody}</p>

									<label>
										Commentaires<strong>{comment.username}</strong> commented on your post
									</label>
									{authState.username === comment.username || adminRole === true ? (
										<button
											className="smallBtn"
											onClick={() => {
												deleteComment(comment.id);
											}}
										>
											Poubelle
										</button>
									) : (
										''
									)}
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</Formik>
	);
}

export default Post;
