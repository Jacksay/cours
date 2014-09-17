% TP1 : HTML
% Technologies du web
% Stéphane Bouvry, 2014

# Objectif

- Créer une page web simple
- Structurer les données textuelles
- Utiliser CSS pour mettre en forme le texte



# Exercice 1 : Première page web

Le contenu d’une page Web (la partie visible) est toujours placé dans le **corps du document**, soit entre les balises `<body>` et `</body>`.

Utiliser l'éditeur de code Brackets <http://www.brackets.io/> pour saisir les lignes suivantes :

```html
<!DOCTYPE html>
<html>
<head>
	<title>Ma première page web</title>
</head>
<body>
	Bonjour HTML !
</body>
</html>
```

Enregistrez le fichier avec l'extension de fichier `.html` puis ouvrez le fichier dans le navigateur Firefox.

# Le texte dans HTML

## Exercice 2 : Les titres

Il est important de hiérarchiser les informations d'un document. Les titres permettent de structurer l'information (par exemple, les noms de chapitre, section, sous-partie, etc...).

Le langage HTML propose jusqu’à 6 niveaux de titre. Quand on sait que titre en anglais se dit *heading*, l’élaboration de la balise devient évidente ; `<h pour heading suivi du numéro du niveau 1, 2, 3, 4, 5, 6>`. La notation `<hx>` sera utiliseé, où x est un niveau de 1 à 6.

```html
<!DOCTYPE html>
<html>
<head>
	<title>Ma première page web</title>
</head>
<body>
	<h1>Titre de niveau 1</h1>
	<h2>Titre de niveau 2</h2>
	<h3>Titre de niveau 3</h3>
	<h4>Titre de niveau 4</h4>
	<h5>Titre de niveau 5</h5>
	<h6>Titre de niveau 6</h6>
</body>
</html>
```

<div class="alert alert-info">

L'apparence des titres (taille, graisse des cractères ou couleur) et déterminé par le navigateur, elle pourra être modifiée en utilisant CSS.

</div>

## Paragraphes et retours à la ligne

Les paragraphes sont délimités par la balise `<p>...</p>` :

```html
<!DOCTYPE html>
<html>
<head>
	<title>Ma première page web</title>
</head>
<body>
	<h1>Titre de niveau 1</h1>
	<h2>Titre de niveau 2</h2>
	<h3>Titre de niveau 3</h3>
	<h4>Titre de niveau 4</h4>
	<h5>Titre de niveau 5</h5>
	<h6>Titre de niveau 6</h6>

	<p>
		Pargraphe 1
	</p>

	<p>
		Pargraphe 2
	</p>
</body>
</html>
```


Dans certains cas de figure très particulier, il peut être necessaire de forcer les retours à la ligne manuellement.

Pour forcer un retour à la ligne, on peut utiliser la balise `<br />`.

<div class="alert alert-info">

La balise `<br/>` est ce qu'on appelle une **balise vide**. Les balises vides comme `<br/>` ou `<hr/>` n'ont pas de contenu, elles ont toujours l'aspect `<nomBalise />`.

</div>

## Exercice 3, important et emphase: 

Les balises `<strong>...</strong>` et `<em>...</em>` permettent de délimiter des fragments de texte important (avec strong) ou une emphase (avec `em`).

```html
<p>
	<strong>Fin des inscriptions le 9 septembre</strong> ! Pour signaler une impossibilité, présentez vous à Mme Bonpoil <em>muni d'un justificatif valable</em>.
</p>
```

L'utilisation de `strong` et `em` ne doit pas être justifié par l'aspect obtenu, en effet, sur les synthétiseurs vocaux, les fragments de texte délimités par ces balises seront resitués avec des variations de tons.

Si vous soutez *relever visuellement* une potion de texte, utilisez plutôt les balises `b` (visuellement très important) et `i` (visuellement important).

Plus d'informations ici : <http://www.alsacreations.com/article/lire/552-strong-b-em-i-quelle-balise-utiliser-et-pourquoi.html>

## Les listes

HTML propose 2 types de liste : Les listes ordonnées et les listes simples.

### Listes ordonnées

Pour une liste ordonnée, on utilise la balise `<ol>`. Les items de la liste sont ensuites délimités avec la balise `li` :

```html
<ol>
	<li>Item 1</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ol>
```

<div class="info">
Les listes ordonnées seront automatiquement numérotées par le navigateur. L'apparence de la numérotation peut être ajustée avec CSS.
</div>

### Listes à puces

Les listes simples fonctionnent de la même manière mais on utilse la balise `<ul>` pour délimiter les items : 

```html
<ul>
	<li>Item</li>
	<li>Item</li>
	<li>Item</li>
</ul>
```

### Liste imbriquées

Vous pouvez également imbriquer les listes en plaçant une liste dans un item : 


```html
<ol>
	<li>Item 1
		<ol>
			<li>Item 1.1</li>
			<li>Item 1.2</li>
			<li>Item 1.3</li>
		</ol>
	</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ol>
```

Donne : 
<ol>
	<li>Item 1
		<ol>
			<li>Item 1.1</li>
			<li>Item 1.2</li>
			<li>Item 1.3</li>
		</ol>
	</li>
	<li>Item 2</li>
	<li>Item 3</li>
</ol>


## Exercice 4 : Autres balises

HTML5 fournit un grand nombre de balise pour la structuration du texte.

### Pour les blocks de texte

Ces balises délimitent des zone de texte. Nous avons déjà vu les balise de titrage et la balise de paragraphe. Ces balises provoquent **une rupture dans le flux** : 

```html
<p>Ligne 1</p>
<p>Ligne 2</p>
```

<div class="alert alert-info">
Si vous supprimez les retours à la ligne du code ci-dessous, le texte sera malgrès tout sur 2 lignes (la fameuse *rupture du flux*)
</div>

<table class="table">
<thead>
<tr>
<th>Balise</th>
<th>Type de contenu</th>
<th>Exemple</th>
</tr>
</thead>
<tbody>

<tr>
<td>`blockquote`</td>
<td>Citation longue</td>
<td>
```html
<blockquote cite="https://developer.mozilla.org/fr/docs/Web/HTML/Element/blockquote">
<p>L'élément HTML `blockquote` (Bloc de citation) indique que le texte visé est une citation longue.</p>
<p>Habituellement, le texte est affiché avec une indentation</p>
</blockquote>
```
</td>
</tr>

<tr>
<td>`pre`</td>
<td>Préformaté</td>
<td>

Les retours à la ligne, espaces et tabulations seront réstitués tel que définit dans la source.

```html
<pre>
   Les
   retour
   à
   la ligne
   sont
   respectés
</pre>
```
</td>
</tr>


### Pour les fragements de texte

Ces balises sont utilisées pour délimiter des fragments de texte, on parle généralement de **balises *inline***.

<table class="table">
<thead>
<tr>
<th>Balise</th>
<th>Type de contenu</th>
<th>Exemple</th>
</tr>
</thead>
<tbody>

<tr>
<td>`abbr`</td>
<td>Abbréviation ou acronyme</td>
<td>
```html
Le langage <abbr title="HyperText Markup Language">HTML</abbr>.
```
</td>
</tr>

<tr>
<td>`cite`</td>
<td>Citation courte (oeuvre, films, travaux)</td>
<td>
```html
Eminem a chanté <cite>Square Dance</abbr>.
```
</td>
</tr>

<tr>
<td>`code`</td>
<td>Un extrait de code informatique</td>
<td>
```html
La balise <code>h1</code> délimite un titre de niveau 1.
```
</td>
</tr>

<tr>
<td>`dfn`</td>
<td>Un définition</td>
<td>
```html
<p>Le <dfn>Javascript</dfn> est un langage de script permettant d'ajouter de l'interactivité à une page web</p>
```
Plus d'informations sur son utilisation ici :
<https://developer.mozilla.org/fr/docs/Web/HTML/Element/dfn>
</td>
</tr>

<tr>
<td>`kbd`</td>
<td>Une entrée utilisateur (au clavier)</td>
<td>
```html
Faites <kbd>ctrl + C</kbd> pour copier le contenu selectionné
```
</td>
</tr>

<tr>
<td>`mark`</td>
<td>Surligne une information (généralement un résultat de recherche)</td>
<td>
```html
le texte est <mark>surligné</mark>.
```
</td>
</tr>

<tr>
<td>`q`</td>
<td>(pour *Quote*) Une citation en ligne</td>
<td>
```html
Comme le disait Jack Torrence <q>All work and no play make Jack a dull boy</q>.
```
On peut utiliser l'attribut `cite` pour préciser la source (sous la forme d'une URL).
</td>
</tr>

<tr>
<td>`samp`</td>
<td>Résultat/sortie (généralement affiché par un programme)</td>
<td>
```html
Le navigateur affiche <samp>404 Not Found</samp>.
```
</td>
</tr>

<tr>
<td>`small`</td>
<td>Texte de moindre importance (Copyright, mentions légales)</td>
<td>
```html
Créé par Ubuntu <small>Copyright © 2104</small>.
```
</td>
</tr>

<tr>
<td>`sub`</td>
<td>Indice</td>
<td>
```html
La molécule d'eau est symbolisée par H<sub>2</sub>O.
```
</td>
</tr>

<tr>
<td>`sup`</td>
<td>Exposant</td>
<td>
```html
C'est la 3<sup>ème</sup> fois.
```
</td>
</tr>

<tr>
<td>`time`</td>
<td>Données temporelles (date / heure)</td>
<td>
```html
Nous somme le <time datetime="2014-09-17">17 semptembre 2014</time>.
```
L'attribut `datetime` permet de préciser l'information dans un format standard (Norme ISO).
</td>
</tr>

</tbody>
</table>






# Mise en forme CSS


