% TP3 : CSS
% Technologies du web
% Stéphane Bouvry, 2014

# Objectif

- Utilisation des CSS

# Selecteurs

## Rédiger des sélecteurs

Soit le fichier HTML suivant : 

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>Ma page web</title>
</head>
<body>
	<div id="container">
		<header>
			<h1>The Walking dead</h1>
			<p>Comics book</p>
			<nav>
				<a href="index.html">Accueil</a>
				<a href="personnages.html">Personnages</a>
				<a href="comics.html">Les comics</a>
				<a href="contact.html">Contact</a>
			</nav>
		</header>
		<main>
			<!-- Les personnages -->
			<section id="personnages">
				<h2>Personnages</h2>
				<article class="personnage">
					<h3>Rick</h3>
					<p>Lorem ipsum</p>
					<a href="personnages/rick.html">Lire la suite</a>
				</article>
				<article class="personnage">
					<h3>Michonne</h3>
					<p>Lorem ipsum</p>
					<a href="personnages/michonne.html">Lire la suite</a>
				</article>
			</section>

			<!-- Les comics -->
			<section id="comics">
				<h2>Comics</h2>
				<article class="comics">
					<h3>Livre 1 : Passé décomposé</h3>
					<p>Lorem ipsum</p>
					<a href="personnages/livre-1.html">Lire la suite</a>
				</article>
				<article class="comics">
					<h3>Livre 2 : Cette vie derrière nous</h3>
					<p>Lorem ipsum</p>
					<a href="personnages/livre-2.html">Lire la suite</a>
				</article>
			</section>
		</main>
		<footer>
			Copyright &copy; Jacksay.com
		</footer>
	</div>
</body>
</html>
```

Pour le fichier HTML donné et sans y apporter de modification, écrivez les déclarations CSS permettant de :

- mettre le fond du site en gris foncé,
- mettre tout les textes en gris clair,
- L’arrière plan du titre du site en rouge et le texte en blanc,
- supprimer le soulignement des liens du menu principal,
- mettre le contenu des articles sur les personnages en blanc sur noir, 
- mettre le contenu des articles sur les comics en rouge sur noir,
- mettre le texte du pied de page en caractère 8px,
- afficher les titres des articles en majuscules,
- afficher les liens "lire la suite" avec un aspect bouton,
- afficher la baseline du site en italique,

## Déduction

Le sélecteur CSS `article p` correspond au code source HTML suivant : 

```html
<article> 
	<p>toto</p>
</article>
```

De la même façon, écrivez pour les sélecteurs ci-après, le code HTML (minimale) correspondant.

- a
- article h1
- \#contenu
- .important
- section.actualites article h1
- main section article.ancien
- section article.stickly a
- header.bandeau nav a
- article.nouveau.truc
- article.nouveau header h1
- main section.actualites section.culture article.art footer p.auteur strong

