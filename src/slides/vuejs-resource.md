% VUE RESOURCE
% Communication REST
% 2017

# Introduction

## API REST 

## vue-resource


## Installation

Récupérer le fichier disponible sur le site officiel ou via un CDN.

# Utilisation

## Problèmatique

VueResource s'appuis sur le standard **REST** pour échanger avec une API. Selon le serveur, certaines méthodes de transport ne sont pas prise en charge (PUT, PATCH, DELETE, OPTIONS).

Heureusement, ces méthodes peuvent être *émulées* avec en en-tête HTTP standardisé que VueRessource ajoutera automatiquement : `X-HTTP-Method-Override`

Cette en-tête est généralement supportée par les frameworks (ex : Symfony)

## Configuration type

Le **plugin vue-resource** va ajouter à la classe `Vue` une variable `http` permettant de configurer de façon globale : 

```javascript
// Force la transmission des données en émulant JSON
// Généralement, les servers Apache/NGinx ne le gère pas
// Les servers Node (Express) oui
Vue.http.options.emulateJSON = true;

// Cette options force l'ajout d'une en-tête HTTP
// X-HTTP-Method-Override
// pour les méthodes PUT, PATCH et DELETE
Vue.http.options.emulateHTTP = true;
```

## Configuration locale

Les mêmes options peuvent être fixées au niveau de la Vue : 

```javascript
new Vue({
    http: {
        emulateHTTP: true,
        emulateJSON: true,
        // évite d'avoir à répéter l'URL
        root: 'http://127.0.0.1/restapi'
    }
})
```

## Dans l'instance

L'utilisation de **vue-resource** ajoute une propriété `$http` dans les instance de vue : 

```javascript
// Dans une Vue/Composant

// Requête GET sur /url (Chargement d'un liste)
this.$http.get('/url').then(okCallback, koCallback);
// Requête POST sur /url (Ajout d'une nouvelle ressource)
this.$http.post('/url', dataObj).then(okCallback, koCallback);

// Requête DELETE sur /url/ID (Suppression de la ressource)
this.$http.delete('/url/ID').then(okCallback, koCallback);
// Requête GET sur /url/ID (Chargement d'une ressource)
this.$http.get('/url/ID').then(okCallback, koCallback);
// Requête PUT sur /url/ID (Mise à jour de la resource)
this.$http.put('/url/ID', dataObj).then(okCallback, koCallback);
// Requête HEAD sur /url/ID (Mise à jour de la resource)
this.$http.put('/url/ID', dataObj).then(okCallback, koCallback);
```


