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
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import { ReactComponent as ReactLogo } from './logo/icon.svg';
import { ReactComponent as FooterLogo } from './logo/icon-left-matrix-double.svg';

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
		window.location.href = 'http://localhost:3000/login';
	};

	const isResponsive = useMediaQuery({ query: '(max-width: 768px)' });
	const isDesktop = useMediaQuery({ query: '(min-width: 769px)' });

	return (
		<div className="App">
			<AuthContext.Provider value={{ authState, setAuthState }}>
				<Router>
					{isResponsive && (
						<div className="navbarResponsive">
							<div className="linksResponsive">
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
										<Link to="/createpost">Publier</Link>
									</>
								)}
							</div>
							<div className="loggedInContainer">
								<Link to={`/profile/${authState.id}`}> {authState.username} </Link>
								{authState.status && (
									<button className="loginbtn" onClick={logout}>
										Déconnexion
									</button>
								)}
							</div>
						</div>
					)}
					{isDesktop && (
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
										<Link to="/">Accueil</Link>
										<Link to="/createpost">Publier</Link>
									</>
								)}
							</div>
							<div className="loggedInContainer">
								<Link to={`/profile/${authState.id}`}> {authState.username} </Link>
								{authState.status && (
									<button className="loginbtn" onClick={logout}>
										Déconnexion
									</button>
								)}
							</div>
						</div>
					)}

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/createpost" element={<CreatePost />} />
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
			<div className="downBar">
				<FooterLogo className="FooterLogo" />
				<div>
					<p>Paul Jacobi OCR</p>
				</div>
			</div>
		</div>
	);
}

export default App;
