import './App.css';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Navigate,
	Routes,
} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import Registration from './pages/Registration';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import Profile from './pages/Profile';
import ChangePassword from './pages/ChangePassword';
import UpdatePost from './pages/updatePost';
import React from 'react';
import { ReactComponent as ReactLogo } from './logo/icon.svg';
import logo from './logo/icon-left-font-monochrome-black.png';

import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [authState, setAuthState] = useState({
		username: '',
		id: 0,
		role: '',
		status: false,
	});

	useEffect(() => {
		axios
			.get('http://localhost:3001/auth/auth', {
				headers: {
					accessToken: localStorage.getItem('accessToken'),
				},
			})
			.then((response) => {
				if (response.data.error) {
					setAuthState({ ...authState, status: false });
				} else {
					setAuthState({
						username: response.data.username,
						id: response.data.id,
						role: response.data.role,
						status: true,
					});
				}
			});
		// eslint-disable-next-line
	}, []);

	const logout = () => {
		alert('deconnexion');
		localStorage.removeItem('accessToken');
		setAuthState({ username: '', id: 0, role: '', status: false });
	};

	return (
		<div className="App">
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<Router>
					<div className="navbar">
						<div className="links">
							<Link to="/">
								<ReactLogo className="logoNavBar" />
							</Link>
							{!authState.status ? (
								<>
									<Link to="/login">Se connecter</Link>
									<Link to="/registration">S'enregistrer</Link>
								</>
							) : (
								<>
									<Link to="/">
										<div>Accueil</div>
									</Link>
									<Link to="/createpost">Publier un article</Link>
								</>
							)}
						</div>
						<div className="middle">
							<div>
								<h2>Bienvenue sur le réseau social interne</h2>
							</div>
							<div>
								<img src={logo} alt="Logo" />
							</div>
						</div>
						<div className="loggedInContainer">
							<Link to={`/profile/${authState.id}`}> {authState.username} </Link>

							{authState.status && (
								<button className="smallBtn" onClick={logout}>
									Logout
								</button>
							)}
						</div>
					</div>
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/createpost" element={<CreatePost />} />

						<Route
							path="/updatepost/:id"
							exact
							component={() => {
								return authState.status ? <UpdatePost /> : <Navigate to="/" />;
							}}
						/>

						<Route path="/post/:id" element={<Post />} />
						<Route path="/registration" element={<Registration />} />
						<Route path="/login" element={<Login />} />

						<Route path="/profile/:id" element={<Profile />} />

						{() => {
							return authState.status ? <Profile /> : <Navigate to="/" />;
						}}

						<Route path="/changepassword/:id" element={<ChangePassword />} />
						<Route path="*" elemnent={<PageNotFound />} />
					</Routes>
				</Router>
			</AuthContext.Provider>
			<div className="downBar"></div>
		</div>
	);
}

export default App;
