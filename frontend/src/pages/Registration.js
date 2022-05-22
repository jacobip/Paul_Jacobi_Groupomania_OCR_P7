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
		username: Yup.string()
			.email(`L'email n'est pas valide!`)
			.required(`Un email est requis`),
		password: Yup.string()
			.min(
				4,
				`Mot de passe trop court (au moins 4 caractères dont au moins une majuscule, un chiffre et un caractère spécial)`
			)
			.max(
				50,
				`Mot de passe trop long (au maximum 50 caractères dont au moins une majuscule, un chiffre et un caractère spécial)`
			)
			.required(`Un mot de passe est requis`),
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
						placeholder="Mot de passe"
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
