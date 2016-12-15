% REST ![](../images/backbone.png)
% Stéphane Bouvry
% 2014


# RESTFul

## Préambule

RESTFul est un standard d'architecture client-serveur indépendante de la technologie utilisée. 


## Format

C'est avant tout une convention d'accès aux données côté serveur basée sur le **format de l'URL**.

>- GET /models : Liste des données
>- POST /models : Ajout
>- GET /models/1 : Lecture
>- PUT /models/1 : Mise à jour (complète)
>- PATCH /models/1 : Mise à jour (ciblée)
>- DELETE /models/1 : Suppression

REDTFul s'appuit sur le protocole HTTP en utilisant différentes méthodes d'envoi.


## Express

**Express** est un *framework* NodeJS utilisé pour créer des applications Web, il founit nativement des outils pour créer une application web répondant à des requètes HTTP, il est très adapté pour produire des API REST.

```javascript
var express = require('express');

var app = express();

app.get('/', function(req, res){
	res.send('Bonjour');
});

app.listen('3333');
```


## REST avec Express

Le plus simple moyen de créer une API REST avec express passe par l'utilisation d'un router : 

```javascript
// Base pour créer l'API
var express = require('express'),
	app = express(),
	router = express.router();

// CODE API ICI

app.use(router);
app.listen(3333, function() {
    console.log("Server start on 3333");
});
```


## Liste : Côté API

L'API doit retourner les données sous la forme d'un tableau JSON avec le code HTTP 200 ou un code erreur (et l'erreur en réponse) : 

```javascript
router.route('/models')
	// GET /models
	.get(function(req, res){
		try {
			var datas = getSomeData();
			res.json(datas);	
		} catch error {
			res.status(500).send(error);
		}
	});
```

## Liste : Côté backbone

La persistance dans Backbone est automatique ; il faut juste renseigner la propriété `url` de la collection : 

La récupération d'un liste passe par la méthode `fetch()`{.javascript} des collections : 

```javascript
var MaCollection = Backbone.Collection.extend({
	url: '/models'
});

var instanceCollection = new MaCollection();
instanceCollection.fetch(); // GET /models
```

## body parser

Pour les opérations impliquant un traitement de données envoyées, on devra utiliser **body-parser**, un *middleware* expressjs. Il s'installe avec la commande `npm install body-parser --save`.

```javascript
// A ajouter dans l'application
var bodyPaser = require('body-parser');

// Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
```

Les données transmises seront disponibles via la propriété `body` de l'objet requète.



## Ajout : Côté Express

La méthode d'ajout doit retourner l'objet créé (le serveur ajoutera par exemple l'ID).

```javascript
router.route('/models')
	// POST /models
	.post(function(req, res){
		var datas = req.body;
		console.log("CREATE with", datas);
		var createdData = createData(datas);
		res.json(createdData);
	});
```


## Ajout : Backbone

La création d'objet est là aussi automatique. On utilise la méthode `create(jsonData)`{.javascript} pour créer les objets : 

```javascript
var MaCollection = Backbone.Collection.extend({
	url: '/models'
});

var instanceCollection = new MaCollection();
var created = instanceCollection.create({foo: "bar"});
```

Si l'instance est correctement retournée par l'API, Backbone effectuera automatiquement la mise à jour de l'objet dans la collection.


## Suppression : Express

La méthode de suppression ne doit rien retourner de particuler à part un code 200 si l'opération a réussie (sinon un code 500/400).

```javascript
router.route('/models/:id')
	// DELETE /models/ID
	.post(function(req, res){
		var id = req.param('id');
		console.log("DELETE ", id);
		try {
			deleteData(id);
			res.send("");
		} catch error {
			res.status(500).send("");
		}
	});
```

## Suppression : Backbone

La suppression est assurée par la méthode `destroy()`{.javascript}

```javascript
var MaCollection = Backbone.Collection.extend({
	url: '/models'
});

var instanceCollection = new MaCollection();
instanceCollection.fetch();

// Plus tard dans l'application
instanceCollection.get(1).destroy();
```

## Mise à jour : Express

```javascript
router.route('/models/:id')
	// PUT /models/ID
	.put(function(req, res){
		var id = req.param('id'),
			datas = req.body;
		console.log("UPDATE ", id, datas);
		try {
			var updated = updateData(id, datas);
			res.json(updated);
		} catch error {
			res.status(500).send("");
		}
	});
```

## Mise à jour : Backbone

```javascript
// ...
var item = instanceCollection.get(1);

// Modification des valeurs
item.set({ foo: "changed"});

// Enregistrement
item.save();
```
ou (plus courant)

```javascript
// ...
var item = instanceCollection.get(1);

// Enregistrement
item.save({ foo: "changed"});
```

## Mise à jour, patch : Express

Le patch permet de définir les modifications uniquement : 

```javascript
router.route('/models/:id')
	// PATCH /model/:id
	.patch(function(req, res){
		var id = parseInt(req.param('id')),
			datas = req.body;
		console.log("PATCH", datas);
		var patched = patchData(id, datas);
		return patched;
	});
``` 

## Mise à jour, patch : Backbone

```javascript
// ...
var item = instanceCollection.get(1);

// Patch des valeurs
item.save({ foo: "changed"}, {patch: true});
```

## Lecture simple : Express

```javascript
router.route('/personnages/:id')
	// GET /models/ID
	.get(function(req, res){
		var id = req.param('id');
		console.log('GET', id);
		res.json(getDatas(id);
	});
```

## Lecture simple : Backbone

Depuis une collection : 

```javascript
var item = instanceCollection.add({id: 1});
item.fetch();
```




# Backbone et REST


## Paramètres avec fetch

Fetch permet d'utiliser une option `data` pour transmettre via l'URL des paramètres à l'API : 

```javascript
var MaCollection = Backbone.Collection.extend({
	url: '/models'
});

var instanceCollection = new MaCollection();

// GET /models?page=2
instanceCollection.fetch({data:{page:2}});
```

## Model sans collection

La propriété `url` existe également dans les *Models*, cependant, pour connecter un Model à une API REST, on utilisera la propriété `urlRoot` : 

```javascript
var MyModel = Backbone.Model.extend({
	urlRoot: '/models'
});

var instance = new MyModel();
instance.save({foo: "bar"}); // POST /models

// ou
var otherInstance = new MyModel({id: 1});
otherInstance.fetch(); // GET /models/1
```


## Événements

Les opérations entre Backbone et l'API REST déclenche différents événements qui peuvent être captés par les vues pour actualiser l'affichage.

>- **sync** Synchronisation des données (success)
>- **error** Synchronisation des données (error)
>- **request** Lancement d'une requète

## Parse

Les retours de l'API peuvent être *trappés* avec la méthode `fetch(serverResponse)`{.javascript} pour personnaliser le traitement : 

```javascript
var MaCollection = Backbone.Collection.extend({
	url: '/models',
	parse: function(response) {
		return response.results;
	}
});
```


## Attendre le serveur

Les méthodes `save(datas)`{.javascript}, `destroy(datas)`{.javascript} et `create(datas)`{.javascript} permettent d'utiliser en 2ème paramètre un *hash* d'options. L'option `{wait: true}`{.javascript} permet de différer l'application des changements (Backbone attend le retour du serveur) : 

```javascript
var item = instanceCollection.get(1);

item.save({foo: "nouvelle valeur"}, {wait: true});
```


## Validation des données

Backbone intègre un mécanisme de validation des données (métier) automatiquement solicité lors des opérations d'enregistrement. La méthode a définir est `validate()`{.javascript}

```javascript
var MonModel = Backbone.Model.extend({
	urlRoot: '/models',
	default: {
		firstname: "",	
		lastname: ""
	},
	validate: function(attrs){
		if( attrs.firstname === "" && attrs.lastname === "" ){
			return "Le nom et le prénom ne peuvent pas être vide";
		}
	}
});

var bad = new MonModel();
bad.save(); // Invalid
```

L'instance emet un événement `invalid`


## validation avec save

Si l'on passe les données dans la méthode `save(datas)`{.javascript}, la validation se fait sur l'instance et pas les données transmises à la méthode.

L'option `validation: true` permet de valider l'instance avec les nouvelles données : 

```javascript
var goodInstance = collections.get(1);

goodInstance.save({
	firstname: "",
	lastname: ""
}, {validation: true}); // Fail, envoi un événement 'invalid'
```


## Options

Les méthodes `save()`{.javascript}, `destroy()`{.javascript} et `fetch()`{.javascript} disposent d'options, les plus usuelles sont : 

>- `success` : définition d'une callback en cas de succès
>- `error` : définition d'une callback en cas d'erreur

<div class="information">
Ces options sont en faites transmises à la méthode `ajax()`{.javascript} de jQuery.
</div>


## Méthodes d'envoi

Certains serveurs ne supportent pas bien les méthodes `DELETE`, `PUT` ou `PATCH`. L'options emulateHTTP permet d'ajouter aux données un attribut `_method` contenant la méthode d'envoi.

```javascript
// Configuration globale de Backbone
Backbone.emulateHTTP = true;
```

<div class="information">
L'utilisation de `_method` est conventionnelle, on la trouve par exemple nativement dans **HTTPFundation** utilisé dans Symfony2 (dont les CRUD sont au format REST).
</div>

## Données JSON

Certains serveurs ne prennent pas en charge nativement les données en JSON, l'options emulateJSON permettra d'envoyer les données en `application/x-www-form-urlencoded`

```javascript
// Configuration globale de Backbone
Backbone.emulateJSON = true;
```

## Gestion des cas particuliers

Si le cas d'application est hors limite, vous pourrez créer vos propres méthodes pour gérer les échanges entre Backbone et votre API ; Le cas le plus courant est simplement la **réécriture de fetch** :P

# Tricks


## Développer le serveur avec GULP

Pour le développement du serveur en node, Gulp propose un plugin qui permet de relancer automatiquement le serveur en cas de changement : **gulp-nodemon**


## Tester les requètes

La console de firefox permet de relancer des requètes Ajax pour rester *visuellement* les retours de l'API.

## Backbone.sync

Il est possible de redéfinir entièrement les méthodes de transmissions utilisées par Backbone en s'appuyant sur l'API `Backbone.sync` (voir doc officielle). Plusieurs plugins existent dans ce sens (par exemple utilisation des localStorage).