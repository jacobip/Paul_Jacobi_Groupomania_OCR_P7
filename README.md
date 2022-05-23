# OCR P7 Créez un réseau social d’entreprise - Paul Jacobi

# Installation

1 - Télécharger et installer MySQL Workbench. https://dev.mysql.com/downloads/workbench/

2 - Créer le dossier 'images' dans le dossier 'backend'.

3 - Exécuter la commande 'npm install' dans le dossier 'backend'.

4 - Exécuter la commande 'npm install' dans le dossier 'frontend' (ignorer le message '6 low vulnerabilities').

5 - Créer et compléter le fichier .env dans le dossier 'backend' (cf. env.exemple).

# Démarrage de l'application

1 - Lancer MySQL Workbench.

1 - Exécuter la commande 'npm start' dans le dossier 'backend' ('ctrl C' pour couper le backend).

2 - Exécuter la commande 'npm start' dans le dossier 'frontend' ('ctrl C' pour couper le frontend).

3 - L'application doit se lancer automatiquement dans votre navigateur, dans le cas contraire aller à l'adresse 'http://localhost:3000' dans votre navigateur.

# Utilisation de l'application

1 - Cliquer sur 's'enregistrer'.

2 - Le nom d'utilisateur doit être un email.

3 - Le mot de passe doit comporter au moins un chiffre, une majuscule et un caractère spécial.

4 - Pour créer un 'admin' : dans MySQL Workbench, dans la table Users choisir un utilisateur et dans la colonne 'role' modifier 'visitor' en 'admin'. Cliquer sur 'apply'.
