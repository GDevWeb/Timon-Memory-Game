# Timon - Le jeu de mémoire

Une version moderne et amusante du jeu de mémoire classique "Simon". Conçu pour divertir et mettre au défi la mémoire des joueurs, Timon propose une interface simple et colorée pour des heures de jeu.

!(public/images/icon.png)

## Fonctionnalités

- **Gameplay intuitif** : Reproduisez une séquence de couleurs de plus en plus longue.
- **Interface utilisateur propre** : Design minimaliste et réactif, adapté à différentes tailles d'écran.
- **Effets sonores et visuels** : Chaque pression sur un bouton déclenche un son distinct et un effet lumineux pour un retour immédiat.
- **Suivi de niveau** : Affiche le niveau actuel pour encourager le joueur à progresser.
- **TypeScript** : Le code source est écrit en TypeScript pour une meilleure maintenabilité.

## Technologies utilisées

- **HTML5** : Structure de la page web.
- **CSS3** : Mise en page et style du jeu.
- **JavaScript (TypeScript)** : Logique du jeu et gestion des interactions.
- **Node.js** : Environnement d'exécution pour les outils de développement.
- **`gh-pages`** : Pour un déploiement facile sur GitHub Pages.
- **`nodemon`** : Pour le rechargement automatique pendant le développement.

## Comment lancer le projet localement

Pour exécuter le jeu sur votre machine, suivez ces étapes :

1. Clonez ce dépôt :
   `git clone https://github.com/GDevWeb/Timon-Memory-Game`
2. Accédez au dossier du projet :
   `cd Timon-Memory-Game`
3. Installez les dépendances :
   `npm install`
4. Lancez le serveur de développement :
   `npm run dev`
5. Ouvrez votre navigateur et naviguez vers `http://localhost:3000` (ou le port indiqué par Nodemon).

## Structure du projet

Voici un aperçu de l'organisation des fichiers :

- `/public/css` : Contient le fichier de style `styles.css`.
- `/public/images` : Contient l'icône du jeu.
- `/src` : Contient le code source principal en TypeScript (`app.ts`).
- `/app.js` : Version compilée du fichier `app.ts` pour la production.
- `/index.html` : Fichier HTML de la page d'accueil.
- `/package.json` : Fichier de configuration pour les dépendances et les scripts.
- `/.gitignore` : Liste des fichiers et dossiers à ignorer par Git.

## Contributions

Le projet étant un MVP, il y a de nombreuses améliorations possibles ! Vous pouvez consulter le fichier [`TODO.md`](TODO.md) pour les prochaines étapes, comme le remplacement des `alert` par des "toasts" plus modernes et la mise en place d'un système de score.

## Auteur

Gaëtan Dammaretz

- GitHub : [GDevWeb](https://github.com/GDevWeb)
- LinkedIn : [Gaëtan Dammaretz](https://www.linkedin.com/in/ga%C3%ABtan-dammaretz/)

## Licence

Ce projet est sous licence ISC.
