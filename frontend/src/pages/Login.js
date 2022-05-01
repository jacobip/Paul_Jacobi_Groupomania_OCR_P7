import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext';
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   username: Yup.string().min(1).max(15).required("🙅 please try again"),
//   password: Yup.string().min(1).max(150).required("🚫 password is invalid"),
// });

// const initialValues = {
//   username: "username",
//   password: "password",
// };

function Login() {
	const [role, setRole] = useState('visitor');

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const { setAuthState } = useContext(AuthContext);

	let navigate = useNavigate();

	const login = () => {
		const data = { username: username, password: password, role: role };
		axios.post('http://localhost:3001/auth/login', data).then((response) => {
			//console.log(response.data.error);
			if (response.data.error) {
				alert(response.data.error);
			} else {
				localStorage.setItem('accessToken', response.data.token);
				//console.log(response.data);
				setAuthState({
					username: response.data.username,
					id: response.data.id,
					role: response.data.role,
					status: true,
				});
				setRole(response.data.role);
				//console.log(role);
				navigate('/');
			}
		});
	};

	return (
		<div
		// initialValues={initialValues}
		// onClick={login}
		// validationSchema={validationSchema}
		>
			<div className="loginContainer">
				<label>Username</label>
				{/* <ErrorMessage name="username" component="span" /> */}
				<input
					name="username"
					type="text"
					placeholder="nom d'utilisateur"
					onChange={(event) => {
						setUsername(event.target.value);
					}}
				/>
				<label>Password</label>
				{/* <ErrorMessage name="password" component="span" /> */}
				<input
					name="password"
					type="password"
					placeholder="mot de passe"
					onChange={(event) => {
						setPassword(event.target.value);
					}}
				/>
				<div>
					<button className="loginButton" type="submit" onClick={login}>
						{' '}
						Login{' '}
					</button>
					{/* <button className="loginButton" type="submit" onClick={loginadmin}>
            {" "}
            admin{" "}
          </button> */}
				</div>
			</div>
		</div>
	);
}

export default Login;
