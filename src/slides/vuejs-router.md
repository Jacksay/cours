% VUE ROUTER
% Webapps
% 2017


# Introduction

## Présentation

Dans le cadre du développement de *Single page application*, **VueRouter** permet de gérer :

- La vue affichée en fonction de la *route*
- De gérer la navigation

## Installation

VueRouter se présente sous la forme d'un fichier javascript (<http://router.vuejs.org/>) à inclure dans son projet :

```html
<script src="path/to/vue.js"></script>
<script src="path/to/vue-router.js"></script>
```

Puis on demande à VueJS d'utiliser VueRouter (facultatif) :

```javascript
// Activation de VueRouter
Vue.use(VueRouter);
```

That's all folk

# Base

## Déclarer les routes

On commence par associer à une route un composant à utiliser pour le rendu :

```javascript
// Configuration des composants
var Accueil = { template: "<h1>Page d'accueil</h1>"};
var Liste = { template: "<h1>Liste</h1>"}

// Routes
var router = new VueRouter({
  routes: [
      { path: "/", component: Accueil },
      { path: "/personnages", component: Liste }
  ]
});

// Application
var application = new Vue({
  el: "#app",
  router: router
})
```

Il n'est pas necessaire de déclarer les composants au sein de l'instance de vue

## Dans l'application

Dans le template, VueRouter propose un composant dédié à l'affichage des composants *routés* : `router-view` :

```html
<div id="app">
  <h1>Mon Application</h1>
  <router-view></router-view>
</div>
```

On peut ensuite utiliser l'URL pour basculer l'affichage des composants dans la `router-view`.

## router-link

**VueRouter** introduit également un composant **router-link** permettant de créer des liens de navigation, ce composant ajoute automatiquement une classe CSS `router-link-active` si l'URL affichée correspond au lien :

```html
<div id="app">
  <h1>Mon Application</h1>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/personnages">Liste</router-link>
  </nav>
  <router-view></router-view>
</div>
```

## router-link tag

Le composant **router-link** a un attribut `tag` pour spécifier la balise à utiliser :

```html
<div id="app">
  <h1>Mon Application</h1>
  <nav>
    <router-link to="/" tag="button">Accueil</router-link>
    <router-link to="/personnages" tag="button">Liste</router-link>
  </nav>
  <router-view></router-view>
</div>
```

## name

Les changements de format des URL necessitera de mettre à jour les templates. Mais on peut utiliser des **routes nommées** :

```javascript
// Routes
var router = new VueRouter({
  routes: [
      { path: "/", component: Accueil, name: "accueil" },
      { path: "/personnages", component: Liste, name: "liste" }
  ]
});
```

Puis dans les templates :

```html
<div id="app">
  <h1>Mon Application</h1>
  <nav>
    <router-link :to="{ name: 'accueil' }">Accueil</router-link>
    <router-link :to="{ name: 'liste' }">Liste</router-link>
  </nav>
  <router-view></router-view>
</div>
```

## Dans l'instance de vue

On peut également utiliser `$router.push('/url')` depuis l'instance de vue pour naviguer par
programmation :

```javascript
new Vue({
   // ...
   methods: {
      someMethod: function(){
         // Fonctionne comme :to dans le template
         this.$router.push('/someurl')
      }
   }
})
```

# Données

## En utilisant props (Compliqué)

```javascript
var Fiche = {
   template: "<h1>FICHE</h1>",
   props: ['personnages']
};

// ...
new Vue({
   // ...
   data: {
      personnages: []
   }
})
```

```html
<router-view :personnages="personnages"></router-view>
```

Problème, il faudra déclarer des les props de tous les composants les données transmises (fastidieux).

## Avec un store (net)

```javascript
var Store: {
   foo: "bar",
   list: ['toto', 'tutu']
};

var Fiche = {
   template: "<h1>FICHE</h1>",
   data: function(){
      return {
         store: Store
      }
   }
};
var Liste = {
   template: "<h1>liste</h1>",
   data: function(){
      return {
         store: Store
      }
   }
};
```

# Faire communiquer

## Event

Pour éviter de coupler trop fortement le composant avec la vue, on peut utiliser l'émission d'événement avec `$emit('event', params...)` dans le composant et `v-on:event` dans le template de la vue (l'événement **DOIT ÊTRE EN MINUSCULE**, il passe par le DOM) :

```html
<!-- Template composant -->
<a href="#" @click.prevent="$emit('myevent', 'foo value', 'bar value')">TEST</a>
```

```html
<!-- Template composant -->
<router-view @myevent="methodeVue">TEST</a>
```

```javascript
new Vue({
   // ...
   methods: {
      methodeVue: function( varFoo, varBar ){
         console.log(varFoo); // affiche 'foo'
         console.log(varBar); // affiche 'bar'
      }
   }
})
```

# Routes dynamiques

## Paramètres d'URL

On peut également créer des URL dynamiques avec des paramètres :

```javascript
var Fiche = { template: "<h1>FICHE</h1>"};

// Routes
var router = new VueRouter({
  routes: [
      // ...
      { path: "/personnage/:id", component: Fiche }
  ]
});
```

Exemple d'URL : `#/personnage/1`

## Récupérer le paramètre

On peut ensuite récupérer les paramètres dans le *template* du composant avec la clef `$route.params` :

```javascript
var Fiche = { template: "<div>"
  + "<h1>FICHE</h1>"
  + "<p>ID = {{ $route.params.id }}</p>"
  + "</div>"};

// Routes
var router = new VueRouter({
  routes: [
      // ...
      { path: "/personnage/:id", component: Fiche }
  ]
});
```

## router-link et paramètres

Pour les routers link, on utilisera les routes nommées pour affecter des paramètres :

```html
<div id="app">
  <h1>Mon Application</h1>
  <nav>
    <router-link :to="{ name: 'accueil', params: { id: 1} }" tag="button">Fiche 1</router-link>
    <router-link :to="{ name: 'accueil', params: { id: 2} }" tag="button">Fiche 2</router-link>
  </nav>
  <router-view></router-view>
</div>
```

## watch

Astuce : On peut surveiller au sein d'un composant ou de la vue les changements d'URL en utilisant un *watcher* sur la clef `$route` :

```javascript
//
var Fiche = {
  template: "<div>"
    + "<h1>FICHE</h1>"
    + "<p>ID = {{ $route.params.id }}</p>"
    + "</div>"},
  watch: {
    '$route': function(nouvelle, ancienne){
      console.log('La route a changé');
      console.log('Nouvelle', nouvelle);
      console.log('Ancienne', ancienne);
    }
  }  
```

Cela permet de gérer les modifications du modèle selon la route utilisée
