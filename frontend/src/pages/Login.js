import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';

function Login() {
	const [role, setRole] = useState('visitor');

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { setAuthState } = useContext(AuthContext);

	let navigate = useNavigate();

	const login = () => {
		const data = { username: username, password: password, role: role };
		axios.post('http://localhost:3001/auth/login', data).then((response) => {
			if (response.data.error) {
				alert(response.data.error);
			} else {
				localStorage.setItem('accessToken', response.data.token);
				setAuthState({
					username: response.data.username,
					id: response.data.id,
					role: response.data.role,
					status: true,
				});
				setRole(response.data.role);

				navigate('/');
			}
		});
	};

	return (
		<div className="changePW">
			<h1>Connection</h1>
			<input
				className="password"
				name="username"
				type="text"
				placeholder="nom d'utilisateur"
				onChange={(event) => {
					setUsername(event.target.value);
				}}
			/>
			<input
				className="password"
				name="password"
				type="password"
				placeholder="mot de passe"
				onChange={(event) => {
					setPassword(event.target.value);
				}}
			/>
			<button className="btnChangePW" type="submit" onClick={login}>
				Se connecter
			</button>
		</div>
	);
}

export default Login;
