% VUEJS
% Webapps
% 2016

# Introduction

## Webapp

## MVC


# Installation

## Sources

A partir des sources depuis le site officiel [vuejs.org]([https://vuejs.org/).

 - Version développement (Erreurs verbeuse, avertissements)
 - Version production (Minifiée)


## CDN

A partir d'un CDN :

 - [jsdelivr](https://www.jsdelivr.com/projects/vue)
 - [cdnjs](https://cdnjs.com/libraries/vue)

## Gestionnaires de paquet

En utilisant **npm** :

```
npm install vue
```

Ou en utilisant le gestionnaire de paquet **Bower** :

```
bower install vue
```


# Premiers pas


## Hello World

```html
<html>
<head><title>Hello World</title></head>
<body>
<div id="app">
Hello world !
</div>
<script src="path/to/vue.js"></script>
<script>/* Code */</script>
</body>
</html>
```

```javascript
// Code
new Vue({
    el: "#app"
})
```

Pas très interactif...

## Data binding

```html
<div id="app">
    <h1>{{ message }}</h1>
</div>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        message: "Hello World"
    }
});
```

VueJS gère automatiquement le **data binding** des données qui **doivent être décarées** préalablement dans `data`.

Le langage de *template* est de type *Mustache*.

## Principe

```javascript
// app.js

var donnees = {
  message: "Hello World"  
};

new Vue({
    el: "#app",
    data: donnees
});
```

VueJS va se *brancher* sur les données et y ajouter un système d'observation et de *getter/setter* pour gérer l'accès au données.

## Two-way binding

Le **data-binding** fonctionne dans les 2 sens en utilisant la directive `v-model` :

```html
<div id="app">
    <h1>{{ message }}</h1>
    <input v-model="message">
</div>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        message: "Hello World"
    }
});
```

## Directives

Pour le rendu, VueJS utilise des directives sous la forme `v-directive`, certaines directive peuvent utiliser des **arguments** sous la forme `v-directive:argument`. Les directives peuvent également utiliser des **modifiers** sous la forme `v-directive:argument.modifier`.

```html
<div id="app">
    <h1>{{ message }}</h1>
    <button v-on:click.prevent="message = 'Hello World'">TEST</button>
</div>
```
```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        message: "Cliquez pour voir le message"
    }
});
```

# Template et affichage des données

## Moustache !

Le système de rendu de VueJS s'appuie sur la syntaxe *Mustache*, il utilise les doubles accolades `{{ donnee }}`.

```html
<div id="app">
    <h1>{{ texte }}</h1>
</div>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        texte: "Hello World"
    }
});
```

## Expression

Le contenu de la moustache est une **expression Javascript** :

```html
<div id="app">
    <p>{{ 1+4 }} = 5</p>
    <p>{{ "Message : " + texte.toUpperCase()}}</p>
    <p>Taille du message : {{ texte.length }}</p>
</div>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        texte: "Hello World"
    }
});
```

## Chaînes sécurisées

Par défault, les chaînes de caractères sont sécurisées :

```html
<div id="app">
    <h1>{{ texte }}</h1>
</div>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        texte: "Le <code>s'affiche</code>"
    }
});
```

## v-html

La directive `v-html` permet d'afficher le contenu d'un donnée comme du HTML :

```html
<div id="app">
    <h1 v-html="texte"></h1>
</div>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        texte: "Le <code>s'affiche</code>"
    }
});
```

## Attributs : v-bind

Les valeurs d'attribut ne peuvent pas être renseignés avec les syntaxes *Mustache*, il faut utiliser la directive `v-bind:attr="exp"` ou `:attribut="exp"`:

```html
<div id="app">
    <h1 v-bind:title="texte">Survoller pour voir le TITLE</h1>
    <button v-bind:disabled="boutonActif">Super bouton</button>
    <button :disabled="boutonActif">Syntaxe courte</button>
</div>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        texte: "Contenu de l'attribut TITLE",
        boutonActif: false
    }
});
```

## v-bind et CSS

Dans le cas de l'attribut `class`, l'utilisation de `v-bind` va concatérer la donnée *bindée* à la valeur initiale :

```html
<div id="app">
  <article class="alert" v-bind:class="style">
    EXAMPLE
  </article>
</div>
```

```javascript
new Vue({
  el: "#app",
  data: {
    style: "alert-info"
  }
});
```

## Usage avancés

Pour gérer des cas plus complexe, la directive `v-bind:class` permet d'utiliser un objet JSON pour décrire l'affectation des classes :

```html
<div id="app">
  <article class="alert"
    v-bind:class="{ 'active': isActive, 'alert-danger': hasError">
    EXAMPLE
  </article>
</div>
```

```javascript
new Vue({
  el: "#app",
  data: {
    isActive: true,
    hasError: true
  }
});
```




# Directives conditionnelle

## Bases

 - `v-show` qui va gérer l'affichage conditionnel,
 - `v-if` alternatif à `v-show`,
 - `v-else` qui va gérer l'affichage si `v-show` ou `v-if` est `false`

## v-show

la directive `v-show` permet de gérer le `display` d'un élément en fonction de l'évalutation d'une expression :

```html
<div id="app">
    <h1 v-show="message">{{ message }}</h1>
    <p class="alert alert-error" v-show="!message">
        Vous devez saisir un message
    </p>
    <input v-model="message">
</div>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        message: ""
    }
});
```

## v-if

La directive `v-if` permet de gérer la présence dans le DOM.

```html
<form id="app" class="container">
    <label>Pseudo :
        <input type="text" v-model="pseudo" class="form-control" />
    </label>
    <label>laisser son email ?
        <input type="checkbox" v-model="hasmail" />
        <input type="email" v-model="mail" v-if="hasmail" />
    </label>
</form>
```

```javascript
// app.js
new Vue({
    el: "#app",
    data: {
        hasmail: false,
        mail: "",
        pseudo: ""
    }
});
```

## Template

`v-if` avec l'élément `template` évite l'utilisation d'un *wrapper* :

```html
<form id="app" class="container">
    <label>
        laisser son email ?
        <input type="checkbox" v-model="hasmail" />
    </label>
    <template v-if="hasmail">
        <p>Un mail de confirmation vous sera envoyé à
        l'adresse <strong>{{mail}}</strong></p>
        <input type="email" v-model="mail"/>
    </template>
    </label>
</form>
```

## v-if / v-show

`v-if` va déterminer la présence ou non dans le DOM alors que `v-show` gère la visibilité avec un `style="display:none"`.

Pour des changements réguliers, `v-show` sera plus performant.


## v-else

Permet de gérer un alternative à `v-show` ou `v-if` :

```html
<template v-if="authenticated">
  <button>Se déconnecter</button>
</template>
<template v-else>
  <button>Se connecter</button>
</template>
```

## v-else-if

La directive `v-else-if="expression"` permet de gérer des conditions plus complexe.


# Données itérables

## v-for : entier

Avec des entiers, la numérisation commence à 1 :

```html
<div id="#app">
  <h2>Table de 2</h2>
  <ul>
    <li v-for="i in 10">{{ i }} x 2 = {{ i * 2 }}</li>
  </ul>
</div>
```

## v-for: Tableau simple

```html
<ul>
  <li v-for="message in messages">{{ message }}</li>
</ul>
```

```javascript
new Vue({
  el: "#app",
  data: {
    messages: ["Hello", "Bye", "Thanks"]
  }
});
```

## v-for : index

On peut obtenir si besoin d'index du tableau lors des itérations.

```html
<ul>
  <li v-for="(message, index) in messages">
    {{index}} : {{ message }}
  </li>
</ul>
```

## v-for : Array d'Object

VueJS peut également gérer des tableaux d'objet :

```html
<ul>
  <li v-for="personnage in personnages">
    {{ personnage.prenom }} {{ personnage.nom }}
  </li>
</ul>
```


```javascript
new Vue({
  el: "#app",
  data: {
    personnages: [
      { prenom: "Ned", nom: "Stark", maison: "Stark"},
      { prenom: "Robb", nom: "Stark", maison: "Stark"},
      { prenom: "Jon", nom: "Snow", maison: "Stark"},
      { prenom: "Tyrion", nom: "Lanister", maison: "Lanister"},
      { prenom: "Cersei", nom: "Lanister", maison: "Lanister"}
    ]
  }
});
```

## v-for : Object

La directive `v-for` permet également d'itérer sur des objets :

```html
<ul>
  <li v-for="personnage in personnages">
    <div v-for="(valeur, clef) in personnage">
      {{clef}} : <strong>{{valeur}}</strong>
    </div>
  </li>
</ul>
```

```javascript
new Vue({
  el: "#app",
  data: {
    personnages: [
      { prenom: "Ned", nom: "Stark", maison: "Stark"},
      { prenom: "Robb", nom: "Stark", maison: "Stark"},
      { prenom: "Jon", nom: "Snow", maison: "Stark"},
      { prenom: "Tyrion", nom: "Lanister", maison: "Lanister"},
      { prenom: "Cersei", nom: "Lanister", maison: "Lanister"}
    ]
  }
});
```

## Données tabulaire

On doit modifier les données tabulaires (Ajout/Suppression) en utilisant les méthodes Javascript (pas les indices) :



# événements et méthodes

## methods

L'instance de vue permet de déclarer des logiques plus complexe via la clef `methods` :

```javascript
new Vue({
  el: "#app",
  data: {
    texte: "C'est vraiment très interessant"
  },
  methods: {
      poke: function(){
          console.log('poke()');
          return "POKE !";
      }
  }
});
```

```html
<div class="alert" v-bind="style">
    <h1>{{ poke() }}</h1>
</div>
```

## Méthode et this

Au sein des méthodes, on peut accéder automatiquement aux données/méthodes de l'instance en utilisant `this` :

```javascript
new Vue({
  el: "#app",
  data: {
    texte: "C'est vraiment très interessant"
  },
  methods: {
      poke: function(){
          this.debug('Appel de la méthode POKE()');
          return "POKE : " + this.texte.toUpperCase();
      },
      debug: function(obj){
          console.log(obj);
      }
  }
});
```

```html
<div class="alert" v-bind="style">
    <h1>{{ poke() }}</h1>
</div>
```


## v-on

Permet de capter des évenements, par exmple le **click** utilise la directive `v-on:click` ou la syntax courte `@click` :

```javascript
new Vue({
  el: "#app",
  data: {
    /* données */
  },
  methods: {
      faireQQC: function(e){
          console.log(e);
      }
  }
});
```

```html
<div class="alert" v-bind="style">
    <a href="#" v-on:click="faireQQC()">Syntaxe normale</a>
    <a href="#" @click="faireQQC()">Syntaxe courte</a>
</div>
```

## Les modifiers avec v-on

La gestion des évenement intère un système de **modifiers** qui permet d'automatiser certaines opérations récurentes.

 * prevent
 * stop
 * self
 * capture
 * once

## Modifier : prevent

On peut *chaîner* `v-on` avec `.prevent` pour réaliser automatiquement un `preventDefault()` :

```html
<div class="alert" v-bind="style">
    <!-- Beaucoup de contenu -->
    <a href="#" v-on:click.prevent="style = 'alert-danger'">
        Danger !
    </a>
</div>
```

## v-on:event.stop

Ce modifieur va interrompre la propagation de l'événement (*bubbuling*) dans le DOM comme le ferai un `stopPropagation()`


## v-on:event.capture

Permet de déclencher de la logique en capurant un événement de passage :

## v-on:event.once

# Computed et Watchers

## Présentation

Problème de performance avec les méthodes

## Computed, Bases

## Computed, Getter et Setter

## v-model

# Exemples
