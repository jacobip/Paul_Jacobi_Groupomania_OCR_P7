import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { AuthContext } from '../helpers/AuthContext';
import { useMediaQuery } from 'react-responsive';

function Profile() {
	let { id } = useParams();
	let navigate = useNavigate();
	const [username, setUsername] = useState('');
	const [listOfPosts, setListOfPosts] = useState([]);
	const { authState, setAuthState } = useContext(AuthContext);
	const [profileRole, setProfileRole] = useState('visitor');

	const adminRole = authState.role === 'admin';

	useEffect(() => {
		axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
			setUsername(response.data.username);
			setProfileRole(response.data.role);
		});
		axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
			setListOfPosts(response.data);
		});
	}, [id]);

	const deleteUser = () => {
		axios
			.delete(`http://localhost:3001/auth/deleteuser/${id}`, {
				headers: { accessToken: localStorage.getItem('accessToken') },
			})
			.then((response) => {
				console.log(response);
				setAuthState({ username: '', id: 0, role: '', status: false });
				navigate('/');
			});
	};

	const isResponsive = useMediaQuery({ query: '(max-width: 768px)' });
	const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

	return (
		<div className="listOfPosts">
			<div className="basicInfo">
				<p className="accountInfoTitle">Profil</p>
				<p>Utilsateur : {username}</p>
				<p>Role : {profileRole}</p>
				<div className="accountInfo">
					{authState.username === username ? (
						<button
							className="smallBtn"
							onClick={() => {
								navigate(`/changepassword/${id}`);
							}}
						>
							Changer mon mot de passe
						</button>
					) : (
						''
					)}

					{authState.username === username || adminRole === true ? (
						<button className="smallBtn" onClick={deleteUser}>
							Supprimez ce compte
						</button>
					) : (
						''
					)}
				</div>
				<p>Toutes les publications de {username}</p>
			</div>

			{listOfPosts.map((value, key) => {
				return (
					<div key={key} className="post">
						{isResponsive && (
							<div className="postResponsive">
								<div className="title"> {value.title} </div>
								<div
									className="bodyResponsive"
									onClick={() => {
										navigate(`/post/${value.id}`);
									}}
								>
									<div className="imageResponsive">
										{value.image ? (
											<img
												className="thumbnailResponsive"
												src={`http://localhost:3001/${value.image}`}
												alt="img from a post"
											/>
										) : (
											''
										)}
									</div>
									<p>{value.postText}</p>
								</div>
								<div className="footer">
									<div className="username">{value.username}</div>
									<div className="buttons">
										<ThumbUpAltIcon />
										<label> {value.Likes.length}</label>
									</div>
								</div>
							</div>
						)}

						{isDesktop && (
							<div className="postDesktop">
								<div className="title"> {value.title} </div>
								<div
									className="bodyDesktop"
									onClick={() => {
										navigate(`/post/${value.id}`);
									}}
								>
									<div className="image">
										{value.image ? (
											<img
												className="thumbnail"
												src={`http://localhost:3001/${value.image}`}
												alt="img from a post"
											/>
										) : (
											''
										)}
									</div>
									<p>{value.postText}</p>
								</div>
								<div className="footer">
									<div className="username">{value.username}</div>
									<div className="buttons">
										<ThumbUpAltIcon />
										<label> {value.Likes.length}</label>
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

export default Profile;
