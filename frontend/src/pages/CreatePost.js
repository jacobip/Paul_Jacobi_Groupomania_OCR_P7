import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
	const [image, setImage] = useState('');

	let navigate = useNavigate();
	const initialValues = {
		title: '',
		postText: '',
	};

	useEffect(() => {
		if (!localStorage.getItem('accessToken')) {
			navigate('/login');
		}
	}, [navigate]);

	const validationSchema = Yup.object().shape({
		title: Yup.string().min(1).max(33).required('Veuillez renseigner le titre'),
		postText: Yup.string()
			.min(1)
			.max(150)
			.required('Veuillez renseigner le texte de la publicatiion'),
	});

	const onSubmit = (data) => {
		const formData = new FormData();
		console.log(image);
		formData.append('image', image);
		formData.append('title', data.title);
		formData.append('postText', data.postText);

		for (var pair of formData.entries()) {
			console.log(pair[0] + ', ' + pair[1]);
		}
		axios
			.post('http://localhost:3001/posts', formData, {
				headers: { accessToken: localStorage.getItem('accessToken') },
			})
			.then((response) => {
				navigate('/');
			});
	};

	return (
		<div className="createPostPage">
			<Formik
				initialValues={initialValues}
				onSubmit={onSubmit}
				method="POST"
				encType="multipart/form-data"
				validationSchema={validationSchema}
			>
				<Form
					className="formContainer"
					method="POST"
					action="/postimg"
					encType="multipart/form-data"
				>
					<p>Créer une publication</p>
					<div className="createPost">
						<ErrorMessage name="title" component="span" />
						<Field
							type="text"
							autoComplete="off"
							className="inputCreatePost"
							name="title"
							placeholder="Titre de la publication"
						/>

						<ErrorMessage name="postText" component="span" />
						<Field
							as="textarea"
							autoComplete="off"
							className="inputCreatePost textAreaPost"
							placeholder="Texte de la publication"
							name="postText"
							id=""
							cols="30"
							rows="9"
						></Field>
						<div className="sendImg">
							<label htmlFor="file">Publier une image</label>
							<input
								id="file"
								className="btnImg"
								type="file"
								name="image"
								size="lg"
								onChange={(e) => setImage(e.target.files[0])}
							/>
						</div>
					</div>
					<button className="btnCreatePost" type="submit">
						Publier
					</button>
				</Form>
			</Formik>
		</div>
	);
}

export default CreatePost;
