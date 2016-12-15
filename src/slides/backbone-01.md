% Backbone.js ![](../images/backbone.png)
% Stéphane Bouvry
% 2014

---

### Stéphane Bouvry

UI Designer / Développeur Front/Back \
![Stéphane Bouvry](../images/contact.jpg) \
<i class="icon-twitter-squared"></i>[\@StudioJacksay](https://twitter.com/StudioJacksay) \
<http://www.jacksay.com>

---

# Introduction{data-background="../images/bg-javascript.jpg"}
Webapps, MVC, framework

---

## Web 2.0

L'avénement du Web 2.0 a permis aux sites web d'évoluer pour devenir des applications 

---	

## Code spagetti

Les permières *applications web* étaient généralement basées sur **jQuery** (ou équivalent), plus l'application était complexe, plus le code se complexifié, l'effet **code spagetti**

---

## Design pattern et framework

Pour répondre aux problématiques de maintenabilité, réusabilité, les *design pattern* sont arrivés dans le microcosme Javascript.

---

## MVC

![Modèle MVC classique](../images/diagrams/mvc-classique.jpg)

---

## MVC côté serveur

![Modèle MVC Web côté serveur](../images/diagrams/mvc-web-serveur.jpg)

---

## MVC côté client

![Modèle MV* dans Backbone](../images/diagrams/mvc-web-front.jpg)

---

# Backbone.js  {data-background="../images/illustrations/backbone.jpg"}
Architecture d'application Javascript

---

Backbone est un *framework* léger (une colonne vertébrale) de base autour de laquelle sera structurée l'application.

---

Il a été inventé par **Jeremy Ashkenas**, le papa de **coffeescript**

---

Il est utilisé sur (non-exhaustif) : 

>- Linkedin (mobile)
>- Digg
>- Pinterest
>- Trello
>- Sony Entertainement Network
>- Wordpress.com
>- etc...

---

## Fiche technique

>- Léger 36ko (61ko avec Zepto)
>- Compatibilité IE 6+ (polyfill JSON)
>- Flexible (n'impose pas la structure, le nommage et le *templating*)
>- DOM propre
>- Stable et mature (premier push en 2010)
>- Pas de *databinding* (Epoxy.js)

---

## Dépendance

Backbone n'a qu'une dépendance stricte, la librairie **underscore.js**.

L'utilisation des vues impose une dépendance supplémentaire à **l'API jQuery** (jquery 1 ou 2, Zepto, ou implémentation maison :P).

---

## Modules

Backbone fournit plusieurs **modules** : 

>- **Event** : Implémentation de *Observer* qui peut être facilement "greffé" sur des objets javascript,
>- **Model** et **Collection** : Données,
>- **View** : Affichage/gestion du DOM (des données),
>- **Router** : Gestion de l'état de l'application en fonction de l'URL

---


## Installation

```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Backbone base</title>
</head>
<body>	
	<script src="libs/jquery.js"></script>
	<script src="libs/underscore.js"></script>
	<script src="libs/backbone.js"></script>
	<script>
	// Application ici
	</script>
</body>
</html>
```


# Events
Module *Observer*

---

## Présentation

Le module **Events** de Backbone permet d'utiliser le modèle *Observer* sur n'importe quel objet Javascript.

Les objets qui sont décorés par **Events** intégrent plusieurs fonctions pour la gestion des événements. Les principales sont : 

>- `on('eventName', callback)`{.javascript} ajouter un écouteur
>- `trigger('eventName'[, datas])`{.javascript} déclencher un événement
>- `off('eventName'[, callback])`{.javascript} retirer un écouteur

D'autres fonctions plus spécifiques existent (Voir la documentation).

---

## Usage

```javascript
var unObjet = {};

// Greffe d'observer à l'objet
_.extend(unObjet, Backbone.Events);

// On écoute l'événement 'unEvenement'
unObjet.on('unEvenement', function(){
	console.log('unEvenement est survenu !', arguments);
});


// On déclenche l'événement 'unEvenement'
unObjet.trigger('unEvenement')
```

---


# Model
Les POJO de Backbone

---

## Classe

Backbone fournit une classe générique fonctionnelle pour créer des instances :

```javascript
var instance = new Backbone.Model();

// manipulation des données ici
```

Dans la pratique, on va créer des classes spécifique pour y introduire de la **logique métier** : 

```javascript
var Personnage = Backbone.Model.extend({
	// Logique métier ici
});
```

---

## Instance

Créer une instance (de *Personnage*) : 

```javascript
var nedStrack = new Personnage();
```

---

## Accesseurs et données
Accès aux données

---

### Propriétés (ou attributs)

Les *Models* permettent de stocker des données.

Ces données **doivent être gérées avec des accesseurs** pour bénéficier des automatismes de *Backbone*.

L'accès aux données passe par 2 méthodes : 

> - `get('property')`{.javascript} pour accéder aux données
> - `set('property', 'value')`{.javascript} pour affecter des données

---

Les méthodes `get('property')`{.javascript} et `set('property', 'value')`{.javascript} sont **polymorphes** ; Elles peuvent prendre différents types et quantité d'arguments...

---

### Setter : base

`set('property', 'value')`{.javascript} permet d'affecter des valeurs individuellement : 

```javascript
// Affectation de firstname
ned.set('firstname', 'Edward');

// Affectation de lastname
ned.set('lastname', 'Stark');
```

`set()`{.javascript} retournant l'instance courante, les appels peuvent être **chaînés** : 

```javascript
// Affectation de firstname et lastname
ned.set('firstname', 'Edward')
   .set('lastname', 'Stark');
```

---

### Setter : compact

La méthode `set` peut également utiliser un *hash* (format JSON) pour affecter plusieurs propriétés d'un seul coup : 

```javascript
// Affecte firstname et lastname
ned.set({
   firstname: 'Edward',
   lastname: 'Stark'
);
```

---

### Getter

La méthode `get` permet d'accéder aux données

```javascript
// Classe Personnage
var Personnage = Backbone.Model.extend({});

// Instance
var ned = new Personnage();

// Attributs
ned.set({
   firstname: 'Edward',
   lastname: 'Stark'
});

// Accès à la propriété "firstname"
console.log(ned.get('firstname'));
```

---

### Instancier

On peut transmettre les données au modèle au moment de l'instanciation : 

```javascript
// Classe Personnage
var Personnage = Backbone.Model.extend({});

// Instance
var ned = new Personnage({
   firstname: 'Edward',
   lastname: 'Stark'
});
```

---

## Définition de classe

---


Les classes qui étendent *Model* héritent des plusieurs méthodes et propriétés.

Définir une classe permet également d'introduire de la **logique métier** à travers la définition de **méthode** et de **propriétés**.

---

### Méthodes

Pour créer ces propres méthodes :

```javascript
// Classe Personnage
var Personnage = Backbone.Model.extend({
	
	// Méthode de classe
	getFullName: function(){
		return this.get('firstname') +' ' + this.get('lastname');
	},

	sePresenter: function(){
		console.log("Bonjour, je m'appelle", this.getFullName());
	}
});

// Instance
var ned = new Personnage({
   firstname: 'Edward',
   lastname: 'Stark'
});

// Affiche Edward Stark
ned.sePresenter();
```

---

### Valeurs par défaut : hash

Au moment de définir une classe, la propriétés `defaults` permet de fixer les valeurs par défaut sous la forme d'un *hash* ou une fonction : 

```javascript
// Classe Personnage
var Personnage = Backbone.Model.extend({
	defaults: {
		dead: false,
		surname: false,
		faction: "No faction"
	}
});

// Instance
var ned = new Personnage({});

// Affiche "No faction"
console.log(ned.get('faction'));
```

---

<!--
### Valeurs par défaut : function

Exemple avec une fonction

```javascript
// Classe Personnage
var Personnage = Backbone.Model.extend({
	defaults: function(){
		return {
			dead: false,
			surname: false,
			faction: "No faction"
		};
	}
});

// Instance
var ned = new Personnage({});

// Affiche "No faction"
console.log(ned.get('faction'));
```
-->
### Initialisation

La méthode `initialize()` permet d'affecter une logique consécutive à la création d'une instance : 

```javascript
var Personnage = Backbone.Model.extend({
	// Exécutée lorsque une instance est
	// créée (new Personnage())
	initialize: function(){
		console.log('Personnage created !');
	}
});
```

---




## Observer dans le Model

---

### Extend Event

La classe **Model** de Backbone intègrent le module '**Events**, les instances disposent donc nativement des méthodes événementielles : 

>- `on('event', callback)`{.javascript} 
>- `trigger('event')`{.javascript}
>- etc...

---

### L'événement **change**

Les modèles déclenchent automatiquement des événements `change` lorsque les attributs sont modifiés : 

```javascript
var Personnage = Backbone.Model.extend({});

var ned = new Personnage();

// Pose de l'écouteur
ned.on('change', function(){
	console.log("Ned a changé");
});

// Déclenche un change
ned.set('firstname', 'Ned');
```

Backbone ne déclenche de change que si un changement est effectif.

---

### Les événements **change:property**

```javascript
var Personnage = Backbone.Model.extend({});
var ned = new Personnage();

// les écouteurs
ned.on('change', function(){ 
	console.log("Quelque chose a changé"); }
);
ned.on('change:firstname', function(){ 
	console.log("Le prénom a changé"); 
});
ned.on('change:lastname', function(){ 
	console.log("Le nom a changé"); 
});

// Déclenche change et change:firstname
ned.set('firstname', 'Edward');

// Déclenche change et change:lastname
ned.set('lastname', 'Stark');

// Déclenche change, change:firstname et change:lastname
ned.set({
	'firstname': 'Eddy',
	'lastname': 'Starkounet',
});
```

---

### Silent

La modification d'un attribut déclenche un événement, ce comportement peut être désactivé avec l'option `silent` :

```javascript
var Personnage = Backbone.Model.extend({});

var ned = new Personnage();

// écouteur
ned.on('change', function(){ console.log("Quelque chose a changé"); });

// Silencieux
ned.set('firstname', 'Edward', {silent: true});

// Déclenche le change
ned.set('lastname', 'Stark');
```

---

## Autres Méthodes

Le Model de Backbone fournit beaucoup d'autres méthodes, quelques exemples : 

>- `obj.has('propertyName')`{.javascript} : Test si la propriété existe (retourne `true`{.javascript} ou `false`{.javascript})
>- `obj.toJSON()`{.javascript} : Retourne les données du modèle au format JSON
>- `obj.hasChanged([attrName])`{.javascript} : Test si le modèle a changé
>- `obj.clone()`{.javascript} : Fait une copie de l'objet vers un autre
>- Etc...

Liste exaustive : <http://backbonejs.org/#Model>

---

# Collection
Gestion de liste de données

--- 

Les collections sont utilisées pour **stoquer et organiser** des listes de données. Elles s'utilisent généralement pour une liste d'objet issus d'un modèle définit.

---

## Basique

Une collection va permettre de gérer une liste d'objet : 

```javascript
// Instanciation d'une collection simple
var liste = new Backbone.Collection();

// Ajout de données dans la collection
liste.add({title: "Objet 1"});
liste.add({title: "Objet 2"});

// "Taille de la collection : 2"
console.log("Taille de la collection : " +liste.length)

// "Objet 1"
console.log(liste.at(0).get('title'));
```

---

## Collection.extend

Comme pour *Model*, on cré ces propres classes *Collection* pour y introduire de la logique métier : 

```javascript
// Définition de la classe
var MaCollection = Backbone.Collection.extend({
	// Logique métier
});

// Instanciation
var collection = new MaCollection()
```


---

## model

Définit le type géré par la collection, c'est l'usage courant) : 

```javascript
var Personnage = Backbone.Model.extend({});

var PersonnagesCollection = Backbone.Collection.extend({
	// Composée d'objet 'Personnage'
	model: Personnage
});
```

---

## add et remove : des instances

Les fonctions `add()` et `remove()` sont utilisées pour gérer le contenu de la collection. On peut manipuler des instances de Model : 


```javascript
// Instances de Model
var ned = new Personnage({firstname: "Edward"});
var joffrey = new Personnage({firstname: "Joffrey"});

// La collection
var personnages = new PersonnagesCollection();

// Ajout
personnages.add(ned);
personnages.add(joffrey);

// Affiche 2
console.log(personnages.length);

// Supprime ned de la liste
personnages.remove(ned);

// Affiche 1
console.log(personnages.length);
```

---

Les fonctions `add()` et `remove()` permettent d'utiliser des tableaux de référence.

```javascript
// Avec des objets
var ned = new Personnage({firstname: "Edward"});
var joffrey = new Personnage({firstname: "Joffrey"});

var personnages = new PersonnagesCollection();
personnages.add([ned, joffrey]);

// Affiche 2
console.log(personnages.length);

personnages.remove([ned, joffrey]);

// Affiche 0
console.log(personnages.length);
```

---

## add : des hash

Les fonctions `add()` et `remove()` fonctionne également avec des *hash*. Les données provoqueront la création d'instance du modèle utilisé dans `model` :


```javascript
// La collection
var personnages = new PersonnagesCollection();

// Ajout de Ned
personnages.add({
	firstname: "Edward",
	lastname: "Stark"
});

// Ajout de Joffrey
personnages.add({
	firstname: "Joffrey",
	lastname: "Baratheon"
});

// Affiche 2
console.log(personnages.length);
```

---

Ou des tableaux de hash :


```javascript
// La collection
var personnages = new PersonnagesCollection();

// Ajout de Ned
personnages.add([
	{
		firstname: "Edward",
		lastname: "Stark"
	},
	{
		firstname: "Joffrey",
		lastname: "Baratheon"
	}
]);
```

---

### Notes

>- Supprimer un objet non-présent dans la collection ne lève pas d'exception
>- Ajouter un objet (par référence) déjà présent ne duplique pas
>- Les index sont gérés par la collection (pas d'index vide)

---

## Utiliser les ID

Backbone intègre nativement une gestion automatique des identifiants d'enregistrement basé sur un attribut **id**.

```javascript
var Personnage = Backbone.Model.extend({
	fullname: function(){
		return this.get('firstname') +" " +this.get('lastname');
	}
});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection([
	{id: 1, firstname: "Edward", lastname: "Stark"},
	{id: 666, firstname: "Joffrey", lastname: "Baratheon"},
	{id: 3, firstname: "Daenerys", lastname: "Targaryen"},
	{id: 4, firstname: "Jon", lastname: "Snow"}
	]);

// Affiche Joffrey Baratheon
console.log(personnages.get(666).fullname());
```

---

## ID unique

La valeur de l'identifiant peut être de n'importe quel type, Backbone gèrera automatiquement l'unicité de cette valeur : **un id en double sera ignoré** : 

```javascript
var Personnage = Backbone.Model.extend({});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection([
	{id: 1, firstname: "Edward"},
	{id: 2, firstname: "Joffrey"},
	{id: 3, firstname: "Daenerys"},
	{id: 4, firstname: "Jon"}
	]);

// Pas d'erreur, ligne ignorée
personnages.add({id:4, firstname: "Sandor"})

// Affiche Jon
console.log(personnages.get(4).get('firstname'));
```

---

## Merge

L'option `{merge: true}`{.javascript} permet de mettre à jour les données déjà présente avec un id donné : 

```javascript
var Personnage = Backbone.Model.extend({});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection([
	{id: 1, firstname: "Edward"},
	{id: 2, firstname: "Joffrey"},
	{id: 3, firstname: "Daenerys"},
	{id: 4, firstname: "Jon"}
	]);

// Pas d'erreur, ligne ignorée
personnages.add({id:4, firstname: "Sandor"}, {merge: true})

// Affiche Sandor
console.log(personnages.get(4).get('firstname'));
```




---

## Evénements d'une collection

Selon les opérations effectuées dans une collection, plusieurs événements peuvent survenir : 

>- **add** Ajout
>- **remove** Suppression
>- **reset** Collection mise à 0
>- **change** et **change:property** modification dans un model de la collection
>- Et d'autres...

---

### add

Surviens quand un élément est ajouté à la collection : 

```javascript
var Personnage = Backbone.Model.extend({});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection();

// On écoute les ajouts dans la collection
personnages.on('add', function(){
	console.log("Ajout dans la collection");
});


// Affiche "Ajout dans la collection"
personnages.add({id:1, firstname: "Edward"});
```

Plusieurs ajouts simmultanés déclenchent plusieurs événements.

---

### remove

Même principe mais lors d'une (ou plusieurs suppression)

```javascript
var Personnage = Backbone.Model.extend({});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection([
	{id: 1, firstname: "Edward"},
	{id: 2, firstname: "Joffrey"},
	{id: 3, firstname: "Daenerys"},
	{id: 4, firstname: "Jon"}
	]);

// On écoute les suppressions dans la collection
personnages.on('remove', function(){
	console.log("Suppression dans la collection");
});


// Affiche "Suppression dans la collection"
personnages.remove(1);
```

---

### reset

Quand la collection est purgée avec la méthode **reset()**

```javascript
var Personnage = Backbone.Model.extend({});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection([
	{id: 1, firstname: "Edward"},
	{id: 2, firstname: "Joffrey"},
	{id: 3, firstname: "Daenerys"},
	{id: 4, firstname: "Jon"}
	]);

// On écoute le reset
personnages.on('reset', function(){
	console.log("Collection purgée");
});


// Affiche "Collection purgée"
personnages.reset();
```

---

## Méthodes des collections

---

### initialize

Exécutée automatiquement lors de la création d'une collection : 

```javascript
var Personnage = Backbone.Model.extend({});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage,
	initialize: function(){
		console.log("Collection de personnage créée");

		// La collection s'écoute elle même (mode mégalo)
		this.on('add', function(){
			console.log("Un personnage ajouté !");
		});
	}
});

// Affiche "Collection de personnage créée"
var personnages = new PersonnagesCollection();

// Affiche "Un personnage ajouté !"
personnages.add({id:1, firstname: "Edward"});
```

--- 

### underscore

Les collections disposent également de méthodes de manipulation des collections fournies par **underscore**.

---

### Exemple : forEach

Permet d'itérer sur les éléments d'une collection : 

```javascript
var Personnage = Backbone.Model.extend({	
	fullname: function(){
		return this.get('firstname') +" " +this.get('lastname');
	}
});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection([
	{id: 1, firstname: "Edward", lastname: "Stark"},
    {id: 2, firstname: "Joffrey", lastname: "Baratheon"},
    {id: 3, firstname: "Daenerys", lastname: "Targaryen"},
    {id: 4, firstname: "Jon", lastname: "Snow"}
	]);

// Affiche :
// Edward Stark
// Joffrey Baratheon
// Daenerys Targaryen
// Jon Snow
personnages.forEach(function(personnage){
	console.log(personnage.fullname());
});
```

---

### filter

Cette méthode retourne les éléments selon un filtre : 

```javascript
var Personnage = Backbone.Model.extend({	
	fullname: function(){
		return this.get('firstname') +" " +this.get('lastname');
	}
});

var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection([
	{id: 1, firstname: "Edward", lastname: "Stark"},
    {id: 2, firstname: "Joffrey", lastname: "Baratheon"},
    {id: 3, firstname: "Daenerys", lastname: "Targaryen"},
    {id: 4, firstname: "Jon", lastname: "Snow"},
    {id: 5, firstname: "Robert", lastname: "Baratheon"}
	]);

var baratheons = personnages.filter(function(personnage){
	return personnage.get('lastname') === "Baratheon";
});

// >> ["Joffrey Baratheon", "Robert Baratheon"] 
console.log(_.map(baratheons, function(p){ return p.fullname()}));
```

---

### sortBy

Cette méthode retourne un tableau trié : 

```javascript
var Personnage = Backbone.Model.extend({	
	fullname: function(){
		return this.get('firstname') +" " +this.get('lastname');
	}
});
var PersonnagesCollection = Backbone.Collection.extend({
	model: Personnage
});

var personnages = new PersonnagesCollection([
	{id: 1, firstname: "Edward", lastname: "Stark"},
    {id: 2, firstname: "Joffrey", lastname: "Baratheon"},
    {id: 3, firstname: "Daenerys", lastname: "Targaryen"},
    {id: 4, firstname: "Jon", lastname: "Snow"},
    {id: 5, firstname: "Robert", lastname: "Baratheon"}
	]);

var sortByLastname = personnages.sortBy(function(personnage){
	return personnage.get('lastname').toLowerCase();
});

// >> ["Joffrey Baratheon", "Robert Baratheon", "Jon Snow", "Edward Stark",
// "Daenerys Targaryen"] 
console.log(_.map(sortByLastname, function(p){ return p.fullname()}));
```

---

... **underscore** propose 28 méthodes pour manipuler les données itérables (Tableaux, Objets, Collections)... 

<http://backbonejs.org/#Collection-Underscore-Methods>

---

# View

---

## Préambule

L'utilisation des vues de Backbone implique la présence d'une librairie *jQuery-like* (implémentation de l'API jQuery): 

>- **Jquery 1.x**, 96ko  (Compatibilité IE 6+)
>- **Jquery 2.x**, 84ko (Compatibilité IE 9+)
>- **Zepto**, 25ko (Compatibilité IE 10+)

---

## Vues simple

Une vue Backbone est une **vue logique**, cette vue sera *connectée* à un élément du DOM (virtuel ou réél) :

```javascript
var Vue = Backbone.View.extend({});

var maVue = new Vue({});

// Affiche <div></div>
console.log(maVue.el)
```

---

## EL

La propriété `el` est une **référence au fragment de DOM** géré par la vue. Ce fragment peut être préexistant : 

```html
<!-- déjà dans le DOM -->
<div id="ned">
	<h1>Ned Stark</h1>
</div>
```

Côté Backbone : 

```javascript
var Vue = Backbone.View.extend({});

var maVue = new Vue({
	el: '#ned'
});

// Affiche <div id="ned">...</div>
console.log(maVue.el)
```

---

... ou généré par la vue backbone pour être ajouté au DOM : 

```javascript
var Vue = Backbone.View.extend({});

var maVue = new Vue({});

// Le fragment est ajouté au DOM
$("body").append(maVue.el);
```

Dans cet exemple, la vue est une `div` vide.

---

## render

La méthode **render()** est utilisée pour définir la logique de rendu de la vue. C'est une *convention* de nommage, mais certains plugins l'utilisent.

```javascript
var Vue = Backbone.View.extend({
	render: function(){
		this.el.innerHTML = "Ma vue";
	}
});

var maVue = new Vue();

maVue.render();

// Le fragment est ajouté au DOM
$("body").append(maVue.el);
```

---

## Chaînage

Le respect du chaînage de la méthode `render()` est très important, les méthodes (de façon générale), doivent retourner l'objet courant.

```javascript
var Vue = Backbone.View.extend({
	render: function(){
		this.el.innerHTML = "Ma vue";
		// Retourne la vue
		return this;
	}
});

var maVue = new Vue();

// Le fragment est rendu et ajouté au DOM
$("body").append(maVue.render().el);
```

--- 

## Méthode

On peut créer autant de méthode/propriété que necessaire

```javascript
var Vue = Backbone.View.extend({

	message: "Hello view",

	render: function(){
		this.el.innerHTML = this.message;
		return this;
	},

	edit: function(){
		console.log("Mode edition");
		this.el.innerHTML = "Mode edition";
	},

	delete: function(){
		this.remove();
	}
});

var maVue = new Vue();

// Le fragment est rendu et ajouté au DOM
$("body").append(maVue.render().el);
```

---

## $EL et $

Les vues fournissent également un accès au DOM décoré par jQuery à travers le propriétés `$el` :

```javascript
var Vue = Backbone.View.extend({
	render: function(){
		this.$el.html("<h1>Ma vue</h1>");
		return this;
	},
});

// etc...
```

Le vue propose également un accès à jQuery via la propriété `$` : 
```javascript
var Vue = Backbone.View.extend({

	afficherTitreDocument: function(){
		console.log(this.$('title').text());
	}
});
```

---

## Propriétés natives

Les vues backbone propose également des propriétés pour gérer le rendu dans le DOM : 

>- **tagName** : Balise conteneur
>- **className** : Classe CSS
>- **id** : L'id dans le DOM
>- **attributes** : Attributs de la balise (data-*)

---

Exemple : 

```javascript
var Vue = Backbone.View.extend({
	// <article></article>
	tagName: "article",
	// id="article_x"
	id: _.uniqueId('article_'),
	// class="container col-md-6"
	className: "container col-md-6",
	attributes: {
		'data-ui': 'somevalue',
		'title': 'Great tooltip :P'
	},

	initialize: function(){
		console.log("Vue créée");
		this.$el.addClass("article");
	},
	
	render: function(){
		this.el.innerHTML = "What view !!!";
		return this;
	}
});

var maVue = new Vue();

// Le fragment est rendu et ajouté au DOM
$("body").append(maVue.render().el);
```

---

## Event hash

La propriété `events` permet de paramétrer les événements liès à la vue sous la forme : 

>- "eventName selector" : "method" : localisé
>- "eventName": "method" : Global

---

Exemple : 

```javascript
var Vue = Backbone.View.extend({
    events: {
        'click .deleter': 'processDelete',
        'dblclick' : 'processEdit'
    },
    message : "Winter is coming",

    render: function(){
        this.el.innerHTML = "<strong>" +this.message +"</strong>"
            +'<a class="deleter" href="#">supprimer</a>';
        return this;
    },
    processEdit: function(){
       	this.$el.html('<input type="text" value="'
       		+ this.message +'" />');
       	this.$el.find('input').on('keypress', function(e){
       		if(e.keyCode === 13){
       			this.message = this.$el.find('input').val();
    			this.render();
       		}
       	}.bind(this)).focus();
    },
    processDelete: function(){
    	this.remove();
    }
});
```

---

## Afficher un modèle

Au moment d'instancier une vue, on peut transmettre à une vue un modèle en utilisant l'option `model` : 

```javascript
var PersonnageView = Backbone.View.extend({
    initialize: function(){
    	console.log("Je suis connecté à " + this.model);
    	this.listenTo(this.model, 'change', this.render);
    },
    render: function(){
    	this.$el.html(this.model.fullname());
    	return this;
    }
});

// Instanciation de la PersonnageView
var nedView = new PersonnageView({
	model: ned
});
```

---

La fonction `listenTo(model, "event", callback)`{.javascript} est un raccourci plus propre que l'utilisation de `on('event', callback)`{.javascript}

```javascript
var PersonnageView = Backbone.View.extend({
    initialize: function(){
    	console.log("Je suis connecté à " + this.model);
    	this.model.on('change', function(){
    		this.render();
    	}.bind(this));
    },
    render: function(){
    	this.$el.html(this.model.fullname());
    	return this;
    }
});

// Instanciation de la PersonnageView
var nedView = new PersonnageView({
	model: ned
});
```

---

## Afficher une collection

Exactement le même principe : 

```javascript
var PersonnageCollectionView = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.model, 'add remove reset', this.render);
    },
    render: function(){
        this.$el.html("");
        this.model.forEach(function(personnage){
            this.$el.append(new PersonnageView({
                model: personnage
            }).render().el);
        }.bind(this));
        return this;
    }
});

// Instanciation de la vue
var liste = new PersonnageCollectionView({
	model: personnages
});

// Le fragment est rendu et ajouté au DOM
$("body").append(liste.render().el);

```

---


# Attention {data-background="../images/illustrations/trap.jpg"}
Les pièges

---

## Pointeurs

```javascript
var Personnage = Backbone.Model.extend({
	defaults: {
		factions: []
	},
	addFaction: function(faction){
		this.get('factions').push(faction);
		return this;
	}
});

var ned 	= new Personnage({ firstname: "Edward", lastname:"Strak"});
var joffrey = new Personnage({ firstname: "Joffrey", lastname:"Baratheon"});

ned.addFaction('Stark');
joffrey.addFaction('Lanister');

console.log(joffrey.toJSON());
console.log(ned.toJSON());

// true (même pointeur) !
console.log( joffrey.get('factions') === ned.get('factions'));
```

