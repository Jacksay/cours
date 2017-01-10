% VUEJS
% Webapps
% 2016


# L'instance de Vue

## Proxy

Par défaut, la Vue peut être utilisée comme un **proxy** pour accéder au modèle : 

```javascript
var instance = new Vue({
  data: {
    foo: "foo",
    bar: "bar"
  }
});

//
console.log(instance.foo); // foo
instance.foo = "oof";
console.log(instance.foo); // oof
```

Les propriétés restent **réactives**

## watch

On peut également surveiller les changements *depuis l'extérieur* avec `$watch`: 

```javascript
var instance = new Vue({
  data: {
    foo: "foo"
  }
});

instance.$watch('foo', function(newVal, oldVal){
  console.log('La propriété FOO a changé', newVal, oldVal);
});
```

## Cycle de vie

L'instance de Vue passe par plusieurs étapes lorsque elle est instancée et **poussée** dans le DOM. Chaque étape peut être interceptée avec un **hook** : 

```javascript
var instance = new Vue({
  data: {
    foo: "foo"
  },
  // Hooks 'created' (Instance prête virtuellement)
  created: function(){
    console.log('created !', this.foo);
  },
  // Hooks 'mounted' (Instance dans le DOM)
  mounted: function(){
    console.log('mounted !', this.foo);
  },
  // Hooks 'mounted' (Instance dans le DOM)
  updated: function(){
    console.log('updated !', this.foo);
  },
  // Hooks 'mounted' (Instance dans le DOM)
  destroyed: function(){
    console.log('destroyed !', this.foo);
  }
});
```

Voir pour plus de détails : <https://vuejs.org/v2/guide/instance.html#Lifecycle-Diagram>


## Template : live

Par défaut, **VueJS** utilise comme gabarit pour le rendu le contenu de l'élément précisé dans `el`, mais on peut utiliser la propriété `template` pour définir un gabarit directement : 

```javascript
new Vue({
  el: "#app",
  template: "<h1>Ma super application</h1>"
})
```

## Template : x-template

Si on indique à la propriété `template` un selecteur, VueJS utilisera le contenu de cet élément comme gabarit. On utilise généralement une balise `script` avec un type `text/x-template` : 

```javascript
new Vue({
  el: "#app",
  template: "#template-app"
})
```

```html
<div id="app"></div>
<script id="template-app" type="text/x-template">
  <article>
    <h1>Mon super template</h1>
    <p>{{ description }}</p>
  </article>
</script>
```

## el et mount

La propriété `el` permet d'indiquer où dans le DOM la vue doit être *montée*. Si il n'est pas précisé, l'instance est présente en mémoire, et on pourra utiliser `$mount(selector)` pour *monter* la vue dans *selector* : 

```javascript
var vue = new Vue({
  template: "<h1>Super template</h1>"
});
vue.$mount('#app');
```

## extend

Si on a besoin de réutiliser une vue, on peut la déclarer avec la méthode `extend`, cela permet de fixer un code commun et des valeurs par défaut : 

```javascript
var MaVue = Vue.extend({
  template: '<div><h1>{{value}}</h1>'
    +'<input v-model="value"/>'
    +'</div>',
  data: function(){
    return {
      value: "Spécifique à la vue"
    }
  }
});
new MaVue({ el : "#vue1"});
new MaVue({ el : "#vue2", data: { value: "Dans VUE2"}});
```

NOTE : l'attribut `data` est géré par une fonction anonyme pour éviter les problème de pointeur.

## Store (modèle commun)

Si plusieurs vues ont besoin de partager un même modèle, on peut passer par un objet : 

```javascript
var common = {
  foo: "Valeur commune"
};
var MaVue = Vue.extend({
  template: '<div><h1>{{value}} / {{common.foo}}</h1>'
    +'<input v-model="value"/>'
    +'<input v-model="common.foo"/>'
    +'</div>',
  data: function(){
    return {
      value : "Par défaut",
      common: common
    }
  }
});
new MaVue({ el : "#vue1"});
new MaVue({ el : "#vue2", data: { value: "Dans VUE2"}});
```

# Composants

## Présentation

Les **composants** sont une des fonctionnalités les plus puissantes dans VueJS. Ils permettent de mieux structurer son code en isolant une partie d'une vue pour la réutiliser ou la simplifier.

Elles ressemblent à l'utilisation de `extend`.

## Déclaration

On commence par déclarer le composant :

```javascript
// Déclaration globale du composant
Vue.component('mon-composant', {
  template: '<h1>Mon Composant !</h1>'
})

new Vue({el: "#app"})
```

Puis pour l'utiliser :

```html
<div id="app">
  <my-component></my-component>
</div>
```

## Déclaration locale

On peut également, si besoin, décomposer la déclaration du composant pour un usage local :

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

La propriété **props** permet également de configurer le typage des données reçues, des valeurs par défaut et/ou son caractère requis :

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

## communication vue/composant

Pour garantir le découplage des vues/composants entre eux, VueJS intègre dans les Vues et les composants le modèle *Observer* :

 - `instance.$on(event, callback)` pour écouter,
 - `instance.$emit(event)` pour diffuser,

NOTE, le `$on` est généralement utilisé *hors vue*.

## Vue et composant

On utilisera la directive `v-on:event` dans les *template* de la vue pour réagir aux événements propagé depuis le composant : 
```html
<div id="app">
  <enfant v-on:supprimer="enfantSupprime"></enfant>
</div>  
```

```javascript
Vue.component('enfant', {
  template: '<strong @click="handlerClick">ENFANT</strong>',
  methods: {
    handlerClick: function(){
      this.$emit('supprimer', 'foo');
    }
  }
})

new Vue({
  el: "#app",
  methods: {
    enfantSupprimer: function(){
      console.log(arguments)
    }
  }
})
```

## Bus

## VueX

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

# Mixins

# Transitions

## Principe

Les transitions sont un mécanisme de vuejs permettant d'ajouter automatiquement des classes à un élément lors de ces changements d'états avec `v-if` ou `v-show`.

Pour indiquer à VusJS de *jouer* une transition, on tutiliser le composant `transition` pour entourer les éléments en précisant la transition à utiliser.

Ce mécanisme permet de réutiliser facilement ces transitions, et de les gérer via CSS plutôt que de polluer la logique de vue avec des effets cosmetiques.

## Exemple de transition

```html
<div id="app">
  <button @click="isVisible = !isVisible">Toogle</button>
  <transition name="fadeslide">
    <h1 v-if="isVisible">Super message</h1>
  </transition>
</div>
```

```css
/** Quand la disparition/apparition est active */
.fadeslide-enter-active, .fadeslide-leave-active {
  transition: opacity .5s}
.fadeslide-enter, .fadeslide-leave {
  opacity: 0}
```

```javascript
new Vue({
  el: "#app",
  data: {
    isVisible: true
  }
});
```

## avec un else

Pour réaliser des transitions entre différents éléments inter-dépendants, il faudra ajouter une clef unique a chaque élément `key="unikey"` : 

```html
<div id="app">
  <button @click="isVisible = !isVisible">Toogle</button>
  <transition name="fadeslide" mode="out-in">
    <h1 v-if="isVisible" key="vis1">Super message</h1>
    <h1 v-else  key="vis2">Autre message</h1>
  </transition>
</div>
```

## mode 

Lors de transitions entres éléments, les transitions sont jouées en même temps (ce qui peut donner un résultat disgracieux selon la mise en page)

```html
<div id="app">
  <button @click="isVisible = !isVisible">Toogle</button>
  <transition name="fadeslide" mode="out-in">
    <h1 key="vis1" v-if="isVisible">Super message</h1>
    <h1 key="vis2" v-else>Autre message</h1>
  </transition>
</div>
```

On peut utiliser un `mode` pour indiquer à VueJS comment il doit enchaîner les transitions :
- `rien` : (par défaut) Joué en même temps
- `out-in` : Jouer d'abord la sortie, puis l'entrée
- `in-out` : Jouer d'abord l'entrée, puis la sortie


## switch

## Enchaînement

## Listes

## Par programmation (jQuery)

# Effets
