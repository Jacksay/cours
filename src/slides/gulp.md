% ![Gulp](../images/gulp-2x.png)
% GULP
% Executeur de tâche Javascript



# Introduction


## *task runner* ?

Les *task runner* sont utilisés pour compiler, générer des fichiers à partir de fichiers sources, automatiser certaines tâches rébarbatives (générer une documentation).

>- **make** et ces *makfile* (Sous unix)
>- **ant** ou **maven** pour Java

## Grunt

<div class="col">
![](../images/grunt-logo.svg)
</div>

<div class="col">
<ul>
	<li>basé sur un fichier de configuration (format JSON)</li>
	<li>*Grunt* est réputé comme plus lent (Utilise des fichiers temporaires)</li>
</ul>
</div>


## Gulp

<div class="col">
![](../images/gulp-2x.png)
</div>

<div class="col">
<ul>
	<li>écriture des tâches en *Javascript*</li>
	<li>Utilise des **streams**</li>
</ul>
</div>


# Démarrer avec Gulp

## Installation

*Gulp* est un programme *NodeJS* en ligne de commande. Pour l'installer, on saisi la commande :

```bash
npm install gulp -g
```

<div class="information">

L'option `-g` fait une installation globale. Sur les système unix ou OSX, il faudra préfixer la commande avec `sudo`.

</div>

On s'assure ensuite que l'installation c'est déroulée correctement avec la commande `gulp -v`, on obtient :

```text
[16:42:11] CLI version 3.8.8
```

## Installation non root

Si l'on ne dispose pas des droits root, on peut installer gulp pour l'utilisateur courant avec la commande :

```bash
npm install gulp
```

Puis en créant un alias :

```bash
alias gulp='~/path/to/gulp/bin/gulp'
```


## projet Node

<div class="information">
Cette étape n'est pas requise, cependant, l'option `--save-dev` permettra de garder une trace des packages installés.
</div>

Si besoin, on initialise le projet en créant le fichier `package.json` ou avec la commande :

```bash
npm init
```

Puis on ajoute *gulp* aux dépendances du projet :

```bash
npm install gulp --save-dev
```


## Le fichier *gulpfile.js*

La commande `gulp` cherche automatiquement un fichier `gulpfile.js` qui va contenir les différentes tâches à effectuer.

```text
$ gulp
[16:48:21] No gulpfile found
```
Si le fichier gulpfile.js n'existe pas, la commande retourne une erreur.

```text
$ touch gulpfile.js
$ gulp
[16:49:17] Using gulpfile ~/Test/Gulp/gulpfile.js
```


## Bonjour gulp

Les tâches vont être codées en javascript dans le fichier *gulpfile.js* :

```javascript
// Fichier gulpfile.js
var gulp = require('gulp');

// Bonjour Gulp !
gulp.task("bonjour", function(){
	console.log("Bonjour Gulp !");
});
```

Puis dans la console :

```text
$ gulp bonjour
[16:53:17] Using gulpfile ~/Test/Gulp/gulpfile.js
[16:53:17] Starting 'bonjour'...
Bonjour Gulp !
[16:53:17] Finished 'bonjour' after 82 μs
```

# Tâches Gulp

## Déclarer une tâche

La méthode `task` permet de définit une tâche sous la forme :

`gulp.task("Nom", callback)`

Par exemple :

```javascript
gulp.task("sepresenter", function(){
	console.log("Je m'appelle Stéphane");
});
```

## Exécuter une tâche

On exécute la commande `gulp` avec en argument le nom de la tâche :

```text
gulp sepresenter
```

## Dépendance

On peut définir des dépendances sous la forme d'un tableau contenant la liste des tâches à effectuer :

```javascript
var gulp = require("gulp");

gulp.task("bonjour", function(){
	console.log("Bonjour Gulp !");
});

// 'sepresenter' executera d'abord 'bonjour'
gulp.task("sepresenter", ["bonjour"], function(){
	console.log("Je m'appelle Stéphane");
});
```

## Plusieurs dépendances

```javascript
var gulp = require("gulp");

gulp.task("bonjour", function(){
	console.log("Bonjour Gulp !");
});

gulp.task("faireuntour", function(){
	console.log("(fait un tour sur lui-même...)");
});

// 'sepresenter' executera d'abord 'bonjour', puis 'faireuntour'
gulp.task("sepresenter", ["bonjour", "faireuntour"], function(){
	console.log("Je m'appelle Stéphane");
});
```

## Multitâche

Il est possible de déclarer une tâche qui se contente d'en exécuter d'autres. Dans ce cas, le *callback* est facultatif :

```javascript
var gulp = require("gulp");

gulp.task("bonjour", function(){
	console.log("Bonjour Gulp !");
});

gulp.task("faireuntour", function(){
	console.log("(fait un tour sur lui-même...)");
});

// 'sepresenter' executera d'abord 'bonjour', puis 'faireuntour'
gulp.task("groupDeTaches", ["bonjour", "faireuntour"]);
```

## Tâche par défaut

C'est la tâche exécutée si aucune tâche n'est précisée :

```javascript
var gulp = require("gulp");

gulp.task("default", function(){
	console.log("Tâche par défaut");
});
```

On l'utilisera pour lancer une série de tâche :

```javascript
var gulp = require("gulp");

gulp.task("default", ["tache1", "tache2", "tacheN"]);
```


## Tâche dans une tâche

La méthode `gulp.run('task')` permet également d'éxécuter une tâche dans une autre :

```javascript
var gulp = require('gulp');

gulp.task('tache1', function(){
	console.log("Faire quelque chose");
});

gulp.task('tache2', function(){
	gulp.run(['tache1']);
});
```

La méthode `run([])` est dépréciée depuis la version 3.9.


# Stream


## Préambule

*Gulp* est utilisé pour manipuler des **streams** de fichier.

![Fonctionnement de Gulp](../images/diagrams/gulp-stream.jpg)

## Méthodes

- La méthode `gulp.src("path/")`{.javascript} va charger un flux de fichier.
- Les traitements successif se feront avec la méthode `pipe(traitement)`{.javascript}.
- Enfin, le résultat sera envoyé dans la destination avec un autre *pipe* contenant le traitement `gulp.dest("path/")`{.javascript}


## src("globs")

Dans *Gulp*, les chemins sont appelés des **globs**.

La méthode `gulp.src("path/")`{.javascript} permet de charger des fichiers.

```javascript
var gulp = require("gulp");

// Simple copie du fichier 'app.js'
gulp.task("copier-js", function(){

	// Charge le fichier "app.js"
	gulp.src("./src/js/app.js")
		 .pipe(gulp.dest("./dist/js"));
});
```

## src(["globs1", "globs2"])

Il est possible également de transmettre un *Array* de chaîne :

```javascript
var gulp = require("gulp");

gulp.task("copier-images", function(){
	// Copie de 2 fichiers
	gulp.src(["./src/favicon.png", "./src/sitemap.xml"])
		 .pipe(gulp.dest("./dist"));
});
```


## Wildcards

Le chemin peut être exprimé avec des *wildcard* :

- `path/*.js` Les fichiers dans *path/* se terminant par *.js*
- `path/**/*.js` Récursif
- `!path/gulpfile.js` Exclu le fichier *gulpfile.js*
- `path/images/*.{png,jpg,gif}`

## Exemple 1

Selectionner tous les fichiers JS non minifiés :

```javascript
var gulp = require("gulp");

gulp.task("ma-tache", function(){
	gulp.src(["./src/**/*.js", "!./src/**/*.min.js"])
		 .pipe(...);
});
```

## Exemple 2

Selectionner tous les images dans le dossier imgs :

```javascript
var gulp = require("gulp");

gulp.task("ma-tache", function(){
	gulp.src("./src/imgs/**/*.{jpg,png,gif}")
		 .pipe(...);
});
```


## Destinations

Le destination est relative à la *wildcard*.

```javascript
var gulp = require("gulp");

gulp.task("ma-tache", function(){
	gulp.src("./src/imgs/**/*.{jpg,png,gif}")
		 .pipe(gulp.dest("./dist/imgs"));
});
```


# Watch

## Introduction

Gulp inclut nativement un mécanisme de surveillance des fichiers avec la méthode `watch(globs)`{.javascript}

Ce mécanisme permet de poser des *écouteurs* sur des *globs* pour déclencher certaines tâches.

## Exemple 1 : SASS

```javascript
var gulp = require('gulp');

var paths = {
	dist: './dist/',
	sass: './src/css/**/*.scss'
};

gulp.task('dev', function(){
	gulp.watch(paths.sass, 'compile-sass');
});

gulp.task('compile-sass', function(){
	gulp.src(paths.sass, path.dest)
		.pipe(gulp.dest(paths.dist));
});

```

## on change

Si besoin, on peut écouter le déclenchement du *watch* avec la fonction `on` :

```javascript
gulp.task('dev', function(){
	gulp.watch(paths.sass, 'compile-sass').on('change', function(event){
		console.log("Le fichier", event.path, "a changé !");
	});
});
```


# Plugins

## Où

Il existe plusieurs façon pour trouver un plugin :

- Google / Stackoverflow
- Github
- Site Gulp : <http://gulpjs.com/plugins/>
- Npm search : <https://www.npmjs.org/>


## Installation

La démarche est souvent la même, on installe le plugin dans les dépendances du projet :

`npm install --save-dev gulp-plugin`

Puis on l'inclus dans le *gulpfile.js* :

`var plugin = require("gulp-plugin")`{.javascript}

Les usages étant normalement bien documentés sur les pages (Github) des plugins.


## gulp-debug

Ce plugin permet de surveiller les opérations faites pas Gulp ; pratique lors de la mise en place d'une tâche Gulp.

```javascript
var gulp = require('gulp'),
	debug = require('gulp-debug');

gulp.task('default', function(){
	return gulp.src('*')
		.pipe(debug());
});
```


## gulp-sass

Compilation des fichiers SASS :

```javascript
var sass = require('gulp-sass');

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});
```

<https://github.com/dlmanning/gulp-sass>


## gulp-plumber

Ce plugin permet d'éviter les interruptions (des watch) lors d'une erreur.

```javascript
var sass = require('gulp-sass'),
	plumber = require('gulp-plumber');

gulp.task('sass', function () {
    gulp.src('./scss/*.scss')
    	.pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('./dist/css'));
});
```

## gulp-changed

Ce plugin est utilisé pour optimiser les opérations en comparant les dates de changement des fichiers (ne génère que le fichier qui ont changé).


## gulp-jshint

Ce plugin permet de lancer une vérification syntaxique automatique sur les fichiers javascript :

```javascript
var jshint = require('gulp-jshint');
var gulp   = require('gulp');

gulp.task('lint', function() {
  return gulp.src('./path/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
```

<https://github.com/spenceralger/gulp-jshint>


## gulp-uglify

Utilisé pour **minifier** les fichiers JS :

```javascript
var uglify = require('gulp-uglify');

gulp.task('minjs', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});
```

<https://github.com/terinjokes/gulp-uglify>


## gulp-minify-css

Utilisé pour **minifier** les fichiers CSS

```javascript
var minifyCss = require('gulp-minify-css');

gulp.task('minicss', function(){
	gulp.src('./src/css/**/*.css')
		.pipe(minifyCss())
		.pipe(gulp.dest('./dist'));
});
```

<https://github.com/jonathanepollack/gulp-minify-css>


## es6

Conversion de l'ES6 en ES5 :

```javascript
// gulfile.js
var gulp = require('gulp'),
    babel = require('gulp-babel')
    ;
gulp.task("es6", function(){
    gulp.src("src/js/*.js")
      .pipe(babel({
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-amd"]
      }))
      .pipe(gulp.dest('dist/js'));
});		
```


## avec AMD

Il suffit d'installer le module **babel-plugin-transform-es2015-modules-amd** :

```bash
npm install --save-dev babel-plugin-transform-es2015-modules-amd
```
Puis de configurer son utilisation dans la tache Gulp :

```javascript
gulp.task("es6", function(){
    gulp.src("src/js/*.js")
      .pipe(babel({
        presets: ['es2015'],
        plugins: ["transform-es2015-modules-amd"]
      }))
      .pipe(gulp.dest('dist/js'));
});
```

NOTE : Le plugin prend en charger le fichier de configuration **.babelrc** si il existe.

## gulp-handlebars

Compilation des fichiers Handlebars.

```javascript
var gulp = require('gulp'),
	wrap = require('gulp-wrap'),
	declare = require('gulp-declare'),
	concat = require('gulp-concat');

gulp.task('hbs', function(){
	return gulp.src('./src/templates/**/*.handlebars')
		.pipe(handlebars())
		.pipe(wrap('Handlebars.template(<%= contents %>)'))
		.pipe(declare({
	      namespace: 'Demo.templates',
	      noRedeclare: true,
	    }))
		.pipe(concat('templates.js'))
		.pipe(gulp.dest('test/'));
});
```
