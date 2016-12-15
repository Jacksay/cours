% Backbone.js, tricks ![](../images/backbone.png)
% Stéphane Bouvry
% 2014

# Conception et classes


## Héritage

La fonction `extend` est utilisée pour déclarer des classes. Elle étend les classes natives de Backbone. 

Elle permet également d'étendre ses propres classes.

```javascript
// Classe Mère
var Identite = Backbone.Model.extend({
	default: {
		nom: "",
		prenom: ""
	},
	sePresenter: function(){
		return 'Je suis ' +this.get('prenom') +' ' +this.get('prenom');
	}
});

// Classe fille
var Personnage = Identite.extend();

var jeanClaude = new Personnage({nom: 'Dus', prenom: 'Jean-Claude'});
console.log(jeanClaude.sePresenter());
```

## Surcharge

Le mécanisme de *surcharge* avec *Backbone* est le même qu'en javascript classique : 

```javascript
var Objet = Backbone.Model.extends({
	// Surcharge JSON
	toJSON: function(){
		// On execute la méthode toJSON initial
		var json = Backbone.Model.prototype.toJSON.call(this);

		// On la complète
		json.extra = "extra";
		return json;
	}
});

var obj = new Objet({
	'turlututu': "Châpeau pointu !"
});
```

## Surcharge avec arguments (call)

```javascript
var Mere = Backbone.Model.extend({
	direQQC: function( message, auteur ){
		console.log("dans Mere > %s dit : %s", auteur, message);
	}
});

var Enfant = Mere.extend({
	direQQC: function( message, auteur ){
		Mere.prototype.direQQC.call(this, message, auteur);
		console.log("dans Enfant > %s dit : %s", auteur, message);
	}
});

var exemple = new Enfant();
exemple.direQQC("L'hiver vient", "Ned");
```

## Surcharge avec arguments (apply)

```javascript
var Mere = Backbone.Model.extend({
	direQQC: function( message, auteur ){
		console.log("dans Mere > %s dit : %s", auteur, message);
	}
});

var Enfant = Mere.extend({
	direQQC: function( message, auteur ){
		Mere.prototype.direQQC.apply(this, arguments);
		console.log("dans Enfant > %s dit : %s", auteur, message);
	}
});

var exemple = new Enfant();
exemple.direQQC("L'hiver vient", "Ned");
```



## Default

Attention, données (Objets ou Tableaux) seront transmis aux instances sous la forme de pointeur : 

```javascript
var MaClasse = Backbone.Model.extend({
    defaults: {
        pointeur: [],
        autrePointeur: {}
    }
    // etc...
});

var a = new MaClasse();
var b = new MaClasse();

a.get('pointeur').push("Un");
a.get('pointeur').push("Deux");
a.get('autrePointeur').clef = "Valeur";

console.log(a.get('pointeur') === b.get('pointeur')); // true
```

## Default : Solution

Utiliser une **fonction** : 

```javascript
var MaClasse = Backbone.Model.extend({
    defaults: function(){
    	return {
	        pointeur: [],
	        autrePointeur: {}
	    };
	}
});

var a = new MaClasse();
var b = new MaClasse();

a.get('pointeur').push("Un");
a.get('pointeur').push("Deux");
a.get('autrePointeur').clef = "Valeur";

console.log(b.toJSON());
```


## Static

Lors de la création d'une classe, on peut déclarer des propriétés / méthodes statiques dans un deuxième paramètres : 

```javascript
var Classe = Backbone.Model.extend({
	// Méthodes / proprétés d'instance
	toto: function(){ console.log("Toto d'instance"); }
}, {
	// Méthodes / proprétés de CLASSE
	toto: function(){
		console.log("Toto de CLASSE");
	}
});

Classe.toto();
```

# Organisation

## Namespace

(Ceci s'applique de façon générale à Javascript)

```javascript
var MyApp = {

	// Espace des composants Backbone
	Model : {},
	Collection : {},
	View : {},
	Router : {},
};

// ...
MyApp.Model.Personnage = Backbone.Model.extend({});
```

## Fonction anonyme

Pour éviter des conflits (par exemple avec [use strict](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Strict_mode), il est recommandé de déclarer les classes dans des fonctions anonymes : 

```javascript
(function(root){
	'use strict';

	// Namespace
	root.App = root.App || {};
	root.App.Model = root.App.Model || {};

	// Classe
	root.App.Model.MaClasse = Backbone.Model.extend();

})(this);
```

## Export NodeJS

Pour rendre une classe compatible NodeJS (Model et Collection), on passe par un test sur module : 

```javascript
(function(root){
	'use strict';

	// On test si Backbone est chargé (NodeJS)
	var Backbone = root.Backbone;
	if( Backbone === undefined && typeof require === 'function' ){
		Backbone = require('Backbone');
	}

	// La classe
	var Personnage = Backbone.Model.extend();

	// NodeJS
	if( typeof module !== 'undefined' ){
		module.exports = Personnage;
	} else {
		root.Personnage = Personnage;		
	}

})(this);
```

## Export (test unitaire)

Cette méthode permet d'utiliser les tests unitaires (exemple avec **mocha**) : 

```javascript
var Personnage = require('../models/Personnage'),
	assert = require("assert");

describe('Personnage', function(){
  describe('#sePresenter()', function(){
  	var ned = new Personnage({
		firstname: "Edward",
		lastname: "Stark"
	});
	var tyrion = new Personnage({
		firstname: "Tyrion",
		lastname: "Lannister",
		surname: "Le lutin"
	});
    it('Affiche firstname lastname et (surname)', function(){
      assert.equal("Edward Stark", ned.sePresenter());
      assert.equal("Tyrion Lannister (Le lutin)", tyrion.sePresenter());
    })
  })
});
```