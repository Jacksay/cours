% REQUIREJS
% Module Loader
% 2016

# Présentation

## C'est quoi RequireJS ?

**RequireJS** est un *Module Loader* Javascript.

Il permet d'organiser et de charger dynamiquement le code Javascript pour **optimiser** son chargement.

## Principe

Quand on utilise RequireJS, parties de l'application ne vont contenir que le chargement de la librairie **RequireJS** et la configuration.

Ensuite, les appels du code provoqueront le chargement des fichiers Javascript necessaire à son fonctionnement.

## Installation

Les sources sont disponibles sur le site officiel : [RequireJS.org](http://requirejs.org/).

On peut également utiliser des gestionnaires de paquet comme **Bower** ou **NPM**.

Ensuite on utilise la balise `script` pour charger le code de **RequireJS** :

```html
<script src="path/to/require.js"></script>
```

## Usage simple : basique

On peut utiliser **RequireJS** en l'état pour ensuite charger ces fichiers Javascript à la demande :

```javascript
// Exemple de chargement de fichier
requirejs(['fichier1.js'], function(){
  console.log('fichier1.js est chargé !');
});
```

Exemple de contenu :

```javascript
// fichier1.js
console.log('Je suis fichier1.js !');
```

## Usage simple : plusieurs fichiers

La fonction `requirejs` permet de spécifier en premier argument **plusieurs fichiers** à charger :

```javascript
// Exemple de chargement de plusieurs fichiers
requirejs(['fichier1.js', 'fichier2.js'], function(){
  console.log('fichier1 et 2 sont chargés!');
});
```

La *callback* ne sera exécutée que lorsque les 2 fichiers seront chargés, a noter que ce chargement étant asynchrone, on ne peut pas savoir lequel des 2 fichiers sera chargé avant l'autre.

## Pas de .js

La présence de l'extension **.js** est facultative.

# Configuration

## Principe

La configuration permet de préciser à **RequireJS** :

 * L'emplacement des fichiers JS
 * Les modules
 * Les dépendances

```javascript
requirejs.config({
  // Configuration
});
```

## Emplacement avec baseUrl

La propriété **baseUrl** permet de renseigner depuis quel dossier les fichiers javascript sont chargés :

```javascript
requirejs.config({
  baseUrl: "js"
});
```

## Déclarer des emplacements avec paths

La propriété **paths** permet de déclarer des emplacements prédéfinis :

```javascript
requirejs.config({
  baseUrl: "js",
  paths: {
    // ./js/app/script1.js
    script1: "app/script1",

    // ./js/app/script2.js
    script2: "app/script2",

    // ./js/app/script3.js
    script3: "app/script3"
  }
});
```

Ensuite une simple `requirejs(['scriptX'], ...)` permettra de charger un fichier.

## Dépendances avec shim

On peut gérer les dépendances avec la propriété `shim` :

```javascript
requirejs.config({
  baseUrl: "js",
  paths: {
    script1: "app/script1",
    script2: "app/script2",
    script3: "app/script3",
  },
  shim: {
    script3: {
      deps: ['script1']
    },
    script1: {
      deps: ['script2']
    }
  }
});
```

**RequireJS** chargera les dépendances avant.

# Modules

## Principe

Le code javascript est rarement actif explicitement dans un fichier, il est chargé, puis sont code est éxécuté dans le script principal.

Il est donc préférable d'utiliser les modules.

## Déclarer un module

La fonction `define(callback)` prend en paramètre un fonction callback qui devra retourner le module
à charger :

```javascript
// js/app/script1.js
define(function(){
  "use strict";
  // On code son module
  var Script1 = {
    name: "Script1",
    version: "0.0.1",
    direBonjour: function(){
      console.log('Bonjour');
    }
  }

  return Script1;
});
```

## Charger un module

Ensuite, au niveau de l'appel de `requirejs`, le module sera disponible dans la fonction callback :

```javascript
// index.html
requirejs(['script1'], function(Script1){
  console.log("Script1 est disponible !");
  Script1.direBonjour(); // Affiche 'Bonjour'
});
```

## Utiliser une fonction anonyme

Il est également préférable d'encapluser la déclaration du module dans une fonction anonyme pour le rendre fonctionnel sans l'utilisation de **RequireJS** :

```javascript
(function(root){
  "use strict";
  // On code son module
  var Script1 = {
    name: "Script1",
    version: "0.0.1",
    direBonjour: function(){
      console.log('Bonjour');
    }
  }
  if( root.define ){
    define(function(){
      return Script1;
    });
  } else {
    root.Script1 = Script1;
  }
})(this);
```
