import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Registration() {
	let navigate = useNavigate();

	const initialValues = {
		username: '',
		password: '',
		role: 'visitor',
	};

	const [infos, setInfos] = useState('');

	const validationSchema = Yup.object().shape({
		username: Yup.string().min(3).max(50).required(),
		password: Yup.string().min(4).max(50).required(),
	});

	const onSubmit = (data) => {
		axios
			.post('http://localhost:3001/auth', data)
			.then((res) => {
				console.log(res);
				setInfos(res.data.msg);
				navigate('/login');
			})
			.catch((err) => {
				setInfos(err.response.data.msg);
			});
	};

	return (
		<>
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				validationSchema={validationSchema}
			>
				<Form className="changePW">
					<h1>Enregistrement</h1>
					<ErrorMessage name="username" component="span" />
					<Field
						className="password"
						autoComplete="off"
						name="username"
						placeholder="Mail Groupomania"
					/>

					<ErrorMessage name="password" component="span" />
					<Field
						className="password"
						autoComplete="off"
						type="password"
						name="password"
						placeholder="Mot de passe Majuscule Num et Caractère spécial"
					/>
					<button className="btnChangePW" type="submit">
						SignUp
					</button>
				</Form>
			</Formik>
			<div>{infos}</div>
		</>
	);
}

export default Registration;
