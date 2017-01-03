% VUEJS
% Webapps
% 2016

# Transitions

## Principe

Les transitions sont un mécanisme de vuejs permettant d'ajouter automatiquement des classes à un élément lors de ces changements d'états.

```html
<div id="app">
  <button @click="show = !show">Toogle</button>
  <transition name="toto">
    <h1 v-if="show">Super message</h1>
  </transition>
</div>
```

```css
.toto-enter-active, .toto-leave-active {
  transition: opacity .5s}
.toto-enter, .toto-leave-active {
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

```html
<div id="app">
  <article is="mon-composant"></article>
</div>
```

## data

Intuitivement, le code suivant semble correct, **C'est faux !** :

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

VueJS impose l'utilisation d'une fonction pour gérer les données d'un composant :

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

## Transmettre des données

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

```html
<div id="app">
  <mon-composant v-bind:extra="info" message="Message 1"></mon-composant>
  <mon-composant v-bind:extra="info" message="Message 2"></mon-composant>
  <mon-composant v-bind:extra="info" message="Message 3"></mon-composant>
  <input v-model="info" />
</div>
```


# Template

# Directives personnalisées

## Nouvelles

# Lifecycle Hooks

# Mixins

# Effets
