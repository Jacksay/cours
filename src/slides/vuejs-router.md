% VUE ROUTER
% Webapps
% 2017


# Introduction

## Présentation

Dans le cadre du développement de *Single page application*, **VueRouter** permet de gérer : 

- La vue affichée en fonction de la *route*
- De gérer la navigation

## Installation

VueRouter se présente sous la forme d'un fichier javascript à inclure dans son projet :

```html
<script src="path/to/vue.js"></script>
<script src="path/to/vue-router.js"></script>
```

Puis on demande à VueJS d'utiliser VueRouter :

```javascript
Vue.use(VueRouter);
```

That's all folk


# Composants

## Présentation

Les **composants** sont une des fonctionnalités les plus puissantes dans VueJS. Ils permettent de mieux structurer son code en isolant une partie d'une vue pour la réutiliser.

## Déclaration

On commence par déclarer le composant :

```javascript
// Déclaration globale du composant
Vue.component('mon-composant', {
  // Options
  template: '<h1>Mon Composant !</h1>'
})

new Vue({
  el: '#app'
})
```

Puis pour l'utiliser :

```html
<div id="app">
  <my-component></my-component>
</div>
```

## Déclaration locale

On peut également, dans un soucis de réutilisabilité, décomposer la déclaration du composant pour un
usage local :

```javascript
// Composant "générique"
var MonComposant = {
  template: '<h1>Mon Composant !</h1>'
};

// Affectation à la vue
new Vue({
  components: {
    'mon-composant' : MonComposant
  }
})
```

Ce mécanisme permet de se prémunir de certains conflits de nommage comme le ferai un espace de nom.

## Wrapper avec is

L'attribut `is` permet de choisir un tag racine spécifique pour répondre favorablement au impératif structurel du HTML :

```html
<section id="app">
  <article is="mon-composant"></article>
</section>
```

Ou encore :

```html
<div id="app">
  <h2>Mes personnages</h2>
  <ul>
    <li is="mon-composant"></li>
  </ul>
</div>
```

## data

Les composants disposent également d'une propriété `data` pour gérer ces propres données, intuitivement, le code suivant semble correct, **C'est faux !** :

```javascript
Vue.component('mon-composant', {
  template: '<button v-on:click="compteur += 1">{{ compteur }}</button>',
  data: {
    compteur: 0
  }
})

new Vue({
  el: '#app'
})
```

```html
<div id="app">
  <mon-composant></mon-composant>
  <mon-composant></mon-composant>
  <mon-composant></mon-composant>
</div>
```

## data function

VueJS impose l'utilisation d'une fonction pour gérer les données d'un composant, cela afin d'éviter les confusions de pointeur :

```javascript
Vue.component('mon-composant', {
  template: '<button v-on:click="compteur += 1">{{ compteur }}</button>',
  data: function(){
    return {
      compteur: 0
    }
  }
})

new Vue({
  el: '#app'
})
```

```html
<div id="app">
  <mon-composant></mon-composant>
  <mon-composant></mon-composant>
  <mon-composant></mon-composant>
</div>
```

## data commune

Dans l'exemple précédent, si l'on voulait *brancher* les composants sur la même source, il faut que la fonction data retourne le même pointeur :

```javascript
var compteurCommun {
  compteur: 0
};

Vue.component('mon-composant', {
  template: '<button v-on:click="compteur += 1">{{ compteur }}</button>',
  data: function(){
    return compteurCommun;
  }
})

new Vue({
  el: '#app'
})
```

```html
<div id="app">
  <mon-composant></mon-composant>
  <mon-composant></mon-composant>
  <mon-composant></mon-composant>
</div>
```

## props : Transmettre des données

La clef **props** permet de configurer les clefs pour les données entrantes.

```javascript
Vue.component('mon-composant', {
  template: '<h1>{{ message }}({{ extra }})</h1>',
  props: ['message', 'extra']
})

new Vue({
  el: '#app',
  data: {
    info: "Exemple"
  }
})
```

Dans cet exemple, 2 proprétés sont déclarées : message et extra

```html
<div id="app">
  <mon-composant v-bind:extra="info" message="Message 1"></mon-composant>
  <mon-composant v-bind:extra="info" message="Message 2"></mon-composant>
  <mon-composant v-bind:extra="info" message="Message 3"></mon-composant>
  <input v-model="info" />
</div>
```

Cette information est **unidirectionnelle**.

## props : validation

La propriété **props** permet également de configurer le typage des données reçues :

```javascript
Vue.component('mon-composant', {
  props: {
      // Type (facultatif)
      age: Number,

      // Type mixte (facultatif)
      code: [String, Number]

      // Donnée requise
      coef: {
        type: Number,
        required: true
      },

      // Donnée par défaut
      prix: {
        type: Number,
        default: 9.99
      }
  }
})
```

# Event API

## Principe

Pour garantir le découplage des vues entre elles, VueJS intègre dans les Vues et les composants le modèle *Observer* :

 - `instance.on(event, callback)` pour écouter,
 - `instance.emit(event)` pour diffuser,

On peut également utiliser la directive `v-on:event` dans les *template* (ce qui est l'usage courant)



# Directives personnalisées

## Principe

VueJS permet de déclarer ces propres directives (à l'instars de v-show ou v-model).

## Globales

```javascript
Vue.directive('jeanclaudifier', {
    inserted: function(el){
      el.innerHTML = "Jean-Claudifié";
    }
});
```

```html
<div id="app">
  <strong v-jeanclaudifier>Pas JC</strong>
</div>
```

# Lifecycle Hooks


# Mixins


# Transitions

## Principe

Les transitions sont un mécanisme de vuejs permettant d'ajouter automatiquement des classes à un élément lors de ces changements d'états avec `v-if` ou `v-show`.

```html
<div id="app">
  <button @click="show = !show">Toogle</button>
  <transition name="toto">
    <h1 v-if="show">Super message</h1>
  </transition>
</div>
```

```css
/** Quand la disparition/apparition est active */
.toto-enter-active, .toto-leave-active {
  transition: opacity .5s}
.toto-enter, .toto-leave {
  opacity: 0}
```

```javascript
new Vue({
  el: "#app",
  data: {
    show: true
  }
});
```

## switch

## Enchaînement

## Listes

## Par programmation (jQuery)

# Effets
