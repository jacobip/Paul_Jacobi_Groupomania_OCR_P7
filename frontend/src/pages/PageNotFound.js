import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
	return (
		<div>
			<h1>Page non trouvée :/</h1>
			<h3>
				Revenir à la page d'accueil: <Link to="/"> Accueil</Link>
			</h3>
		</div>
	);
}

export default PageNotFound;
