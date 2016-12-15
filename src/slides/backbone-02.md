% Backbone.js, suite ![](../images/backbone.png)
% Stéphane Bouvry
% 2014

---

# Router{data-background="../images/illustrations/rails.jpg"}
état de l'application

---

Dans les *frameworks* web, les **Routers** sont chargés de définir l'**état de l'application** en fonction de l'URL demandée.

---

Dans Backbone, le Router va permettre d'associer une ancre (ou un *pattern*) à une **fonction** à déclencher.

![](../images/diagrams/mvc-web-front.jpg)

--- 

Il permettra également d'utiliser **l'historique de navigation** pour naviguer dans l'application et de *bookmarker* l'application *en l'état*.

---

# Backbone.Router

---

## Définir le router

On définit le **Router** avec **extend** : 

```javascript
// Définition du router
var MainRouter = Backbone.Router.extend({
	// Définition du router ici
	routes: {
		'about': 'handleAbout', 	// #about
		'contact': 'handleContact' 	// #contact
	},

	handleAbout: function(){
		$('body').html('<h1>ABOUT</h1>');
	},
	handleContact: function(){
		$('body').html('<h1>CONTACT</h1>');
	}
});
```

---

## Instancier le Router

Ensuite on peut instancier le router. L'historique de navigation **doit être activé après**.

```javascript
// Instanciation du router
var router = new MainRouter();

// Active le routage
Backbone.history.start();
```

---

## Route initiale

Pour définir la route initiale : 

```javascript
var MainRouter = Backbone.Router.extend({
	routes:{
		'': 'home'
	},
	home: function(){
		$('body').html('<h1>HOME</h1>');
	}
});
```

---

## Route par défaut

On peut définir une route spéciale si aucune route ne *match* : 

```javascript
var MainRouter = Backbone.Router.extend({
	routes:{
		'*notFound': 'notFound'
	},
	notFound: function(){
		$('body').html('<h1>404 Not Found</h1>');
	}
});
```

---

## Paramètres

Les URL peuvent contenir des paramètres qui seront transmis à la fonction : 

```javascript
var MainRouter = Backbone.Router.extend({
	routes:{
		'page/:num': 'page'
	},
	page: function( num ){
		$('body').html('<h1>Page ' + num + '</h1>');
	}
});
```

---

## Navigate

La méthode `navigate('url', true)`{.javascript} permet de simuler un changement d'URL : 

```javascript
instanceRouter.navigate('page/3', true);
```

On peut voir la fonction associée s'exécuter et la barre d'adresse se mettre à jour.