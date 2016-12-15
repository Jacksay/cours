% Template<br/> Javascript
% Stéphane Bouvry
% 2014

---

# *Templating*
Moteur de template Javascript

---

## Avant

```javascript 
var html = '<article class="personnage">'
	+ '<h1>' + personnage.fullname() +'</h1>'
	+ '<h2>' + personnage.factions.join(',') +'</h2>'
	+ '<div class="gallery">';

if( personnage.illustrations.length > 0 ){
	html += '<div class="gallery">';
	for( var i=0; i<personnage.illustrations.length; i++ ){
		html += '<figure class="tumb">'
			+ '<img src="' + personnage.illustrations[i] +'" alt="" />'
			+ '</figure>'
	}
	
}
else {
	html += '<p class="no-gallery">No image</p>';
}
html += '</div>';
html += '</article>';
```

- Sâle
- Difficile à maintenir
- Nécessite une bonne connaissance Javascript

---

Les moteurs de *template* permettent : 

>- de séparer les gabarits DOM du code Javascript (le code est placé dans le HTML ou dans des fichiers séparés), 
>- de simplifier la lecture 
>- et la maintenance (par un intégrateur).

---

Exemple d'un *template* : 

```html
<article class="personnage">
	<h1>{{ fullname }}</h1>
	<h2>{{ factions }}</h2>
	<div class="gallery">
	{{#each illustrations}}
		<figure>
			<img src="{{this}}" alt="" />
		</figure>
	{{else}}
		<p class="bo-gallery">No image</p>
	{{/each}}

	<p>{{biography}}</p>
</article>
```

---

## Les moteurs

Il en existe plusieurs : 

>- **Mustache** : Intégéré à AngularJS
>- **Handlebars** : Intégéré à EmberJS
>- **Underscore template** : Présente dans underscore
>- **Hogan** : par Twitter
>- **EJS** : *Rails look*
>- beaucoup d'autres...

Backbone n'ayant pas de moteur par défaut, on peut utiliser celui qu'on veut.

---

# Handlebars
Minimal Templating on Steroids

---

## Pourquoi ?

>- Template "moustache" (compatible avec *Mustache*, proche de *Twig* en PHP)
>- Customisable avec les helpers
>- Utilisable côté serveur et client
>- présent dans EmberJS et Thorax
>- Compatible IE 7+
>- Cool

---

## Dans HTML

Les templates sont placés dans une balise `script` (compatible IE6, ne perturbe pas l'affichage en cas de problème).

```html
<script id="entry-template" type="text/x-handlebars-template">
  template
</script>
```

Exemple : 
```html
<script id="mon-template" type="text/x-handlebars-template">
    <article class="personnage">
        <h1>{{ firstname }} {{ lastname }}</h1>
        <h2>{{ factions }}</h2>
        <p>{{biography}}</p>
    </article>
</script>
```

---

## Compilation

On va ensuite **compiler le template** à partir du contenu de la balise `script` :

```javascript
// On récupère le template
var templateStr = document.querySelector("#mon-template").innerHTML;

// ou avec jQuery
var templateStr = $("#mon-template").html();

// On compile
var template = Handlebars.compile(templateStr);
```

---

## Template compilé

La variable **template** est maintenant une fonction javascript qui va créer un fragement de DOM lorsqu'on lui transmet des données JSON : 

```javascript
$('body').append(template({
	firstname: "Edward",
	lastname: "Stark",
	factions: ['Stark', 'North'],
	biography: "Seigneur du Nord et main du roi Robert"
}));
```

<div class="information">
Les données (JSON) transmises au template sont appelées le **contexte**. Ce terme est récurent dans les langages de template.
</div>

---

# Syntaxe Handlebars

---

## Sécurité

Par défaut, les chaînes de caractères sont échappées : 

Template:
```html
  <h1>{{title}}</h1>
  <p>{{content}}</p>
```

Context:
```javascript
{
	title: "Chaînes sécurisées",
	content: "les balises <strong>sont encodées</strong>"
}
```

On obtient : 
```html
<h1>Chaînes sécurisées</h1>
<p>les balises &lt;strong&gt;sont encodées&lt;/strong&gt;</p>
```

---

## Escape

Le *triple moustache* outrepasse l’échappement HTML : 

Template:
```html
  <h1>{{ title }}</h1>
  <p>{{{ content }}}</p>
```

Context:
```javascript
{
	title: "Chaînes sécurisées",
	content: "les balises <strong>sont encodées</strong>"
}
```

On obtient : 
```html
<h1>Chaînes sécurisées</h1>
<p>les balises <strong>sont encodées</strong></p>
```

--- 

## Pointeurs

Template:
```html
  <h1>{{ title }} </h1>
  <address>
	{{ address.street }}<br/>
	{{ address.zipcode }} {{ address.city }}
  </address>
```

Context:
```javascript
{
	title: "Université de Caen",
	address: {
		street: "Esplanade de la Paix",
		zipcode: 14032,
		city: "Caen"
	}
}
```

On obtient : 
```html
<h1>Université de Caen </h1>
<address>
	Esplanade de la Paix<br>
	14032 Caen
</address>
```

---

## Itérations

Template:
```html
<ul>
  {{#each factions}}
  	<li>{{ . }}</li>
  {{/each}}
</ul>
```

Context:
```javascript
{
	factions: ['Stark', 'North']
}
```

On obtient : 
```html
<ul>
  	<li>Stark</li>
  	<li>North</li>
</ul>
```

Le context change dans la boucle. Le `.` fait référence à l'item (on peut également utiliser `this`{.javascript}).

---

## if/else

```html
<h1>{{ fullname }}</h1>
<h2>
	{{#if dead}}
		Mort
	{{else}}
		Encore vivant
	{{/if}}
</h2>
```

Fonctionne avec n'importe quelle donnée.

---

## unless

Inverse de `if` :

```html
{{#unless faction}}
	<div class="alert danger">sans faction !</div>
{{/unless}}
```

Fonctionne avec n'importe quelle donnée.

---

## each/else

La boucle magique (comme dans Twig) : 

```html
<ul>
  {{#each images}}
  	<img src="{{ src }}" alt="{{ description }}" />
  {{ else }}
  	<p>No image</p>
  {{/each}}
</ul>
```

---

## with/else

Le `with` permet de **modifier le contexte** et inclus un `else` si le contexte est `null :

```html
<ul>
  {{#with address}}
	<address>
	{{ street }}<br/>
	{{ zipcode }} {{ city }}
	</address>
  {{ else }}
  	<p>Pas d'adresse</p>
  {{/with}}
</ul>
```


---

## Commentaires

```html
<ul>
  {{! Liste des factions }}
  {{#each factions}}
  	<li>{{ . }}</li>
  {{/each}}
</ul>
```

---

## @variables

Handlebars propose différentes variables : 

>- `@root` : context initiale
>- `@first` : `true` si premier de l'itération
>- `@last` : `true` si dernier de l'itération
>- `@index` : `int` index dans la liste
>- `@key` : `string` clef dans la liste


---

## Helpers personnalisés

Template:
```html
<article>
  <h1>{{myHelper}}</h1>
</article>
```

Helper:
```javascript
Handlebars.registerHelper('myHelper', function(){
	return "Bonjour Helper !";
});
```

---

## Helpers et this

Les *helpers* reçoivent le **context courant** dans la variables `this`: 

Template (le contexte est *personnage*) :
```html
<article>
  <h1>{{fullname}}</h1>
</article>
```

Helper:
```javascript
Handlebars.registerHelper('fullname', function(){
	return this.get('firstname') + ' ' + this.get('lastname');
});
```

---

## Helpers : paramètres

On peut également transmettre des paramètres à un *helper* : 

Template:
```html
<article>
  <h1>{{monHelper "Coucou" obj.name}}</h1>
</article>
```

Helper:

```javascript
Handlebars.registerHelper('lien', function(message, qui){
	return qui +" a dit : " +message;
});
```

---

## *Safe String*

Par défaut, *Handlebars* sécurise les chaînes pour éviter les **injections de code**.

```javascript
// Retourne &gt;strong&lt;Hello Handlebars&gt;/&lt;
Handlebars.registerHelper('monHelper', function(){
	return "<strong>Hello Handlebars</strong>";
});
```

L'objet `SafeString` permet de garantir que la chaîne est sûr (la tripe moustache n'est donc plus necessaire) : 

```javascript
// Retourne &gt;strong&lt;Hello Handlebars&gt;/&lt;
Handlebars.registerHelper('monHelper', function(){
	return new Handlebars.SafeString("<strong>Hello Handlebars</strong>");
});
```

---

## escapeExpression

La méthode `Handlebars.escapeExpression(String)`{.javascript} permet de remplacer les caractères spéciaux d'une chaîne de caractère pour la sécuriser.

```javascript
Handlebars.registerHelper('lien', function(texte, url){
	// Sécurisation des valeurs
	texte 	= Handlebars.escapeExpression(texte);
	url 	= Handlebars.escapeExpression(url);

	return new Handlebars.SafeString(
		'<a href="' + url+'">' +texte +'</<a>'
	);
});
```

---

## Dans Backbone

On utilise généralement une propriété `template` au moment de définir la vue : 

```javascript
var MaVue = Backbone.View.extend({
	template: Handlebars.compile($('#template').html()),
	render: function(){
		// Le context
		var context = this.model.toJSON();
		var dom = this.templat(context);
		this.$el.html(dom);
	}
});
```

---

# Handlebars en production

---

## Compilation physique

*Handlebars* permet de maximiser les performances en utilisant la compilation physique (2 à 7 fois plus rapide). 

---

## Installation du compilateur

```bash
npm install -g handlebars
```

---

## Compiler

On place le code des templates dans un fichier `monTemplate.handlebars`, puis on compile ce fichier en code javascript avec la commande : 

```bash
handlebars monTemplate.handlebars -f mesTemplates.js
```

Ensuite on incus le fichier mesTemplates.js dans la page, les templates sont intégrés directement dans *Handlebars* : 

```javascript
$('body').append(Handlebars.templates.monTemplate({some: "context"}));
```

---

## Usage

On range souvent tout les templates dans un dossier, la commande `handlebars` compilera le contenu de dossier dans un unique fichier javascript : 

```bash
handlebars dossier/ -f mesTemplates.js
```

L'option `-m` permet de minifier le résultat : 

```bash
handlebars dossier/ -f -m mesTemplates.js
```








