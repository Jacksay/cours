% VUE RESOURCE
% Communication REST
% 2017

# RESTFul

## Préambule

RESTFul est un standard d'architecture client-serveur indépendant de la technologie utilisée.


## Format

C'est avant tout une convention d'accès aux données côté serveur basée sur le **format de l'URL**.

>- GET /models : Liste des données
>- POST /models : Ajout
>- GET /models/1 : Lecture
>- PUT /models/1 : Mise à jour (complète)
>- PATCH /models/1 : Mise à jour (ciblée)
>- DELETE /models/1 : Suppression

REDTFul s'appuit sur le protocole HTTP en utilisant différentes méthodes d'envoi.


## Emulation REST

Il arrive souvent que les méthodes autres que GET et POST ne soient pas prises en charge nativement par le serveur HTTP. Il faut donc que ces méthodes soient émulées en utilisant les en-têtes HTTP.

VueResource dispose d'un méchanisme d'émulation qui va ajouter une en-tête standard pour indiquer au script server la méthode d'envoi "simulé" : `HTTP_X_HTTP_METHOD_OVERRIDE`.

# vue-resource

## Présentation

VueResource est un plugin officiel de VueJS qui va ajouter à l'instance de vue des méthodes pour simplifier la communication entre le vue et une API REST.

## Installation

Récupérer le fichier disponible sur le site officiel <https://github.com/pagekit/vue-resource> ou via un CDN.

VueResource s'active automatiquement lorsque il est inclus dans la page.

# Utilisation

## Problèmatique 1

VueResource s'appuis sur le standard **REST** pour échanger avec une API. Selon le serveur, certaines méthodes de transport ne sont pas prises en charge (PUT, PATCH, DELETE, OPTIONS).

Heureusement, ces méthodes peuvent être *émulées* avec en en-tête HTTP standardisé que VueRessource ajoutera automatiquement : `X-HTTP-Method-Override` en activant l'émulation :

```javascript
// Cette options force l'ajout d'une en-tête HTTP
// X-HTTP-Method-Override
// pour les méthodes PUT, PATCH et DELETE
Vue.http.options.emulateHTTP = true;
```

## Format JSON

Par défaut, les données envoyées par VueJS sont au format JSON. Avec un framework PHP, il faut que les données soient envoyées de la même manière que les formulaires, pour résoudre le problème, on doit émuler je format JSON :

```javascript
// Force la transmission des données en émulant JSON
// Généralement, les servers Apache/NGinx ne le gère pas
// Les servers Node (Express) oui
Vue.http.options.emulateJSON = true;
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
this.$http.get('/url');
// Requête POST sur /url (Ajout d'une nouvelle ressource)
this.$http.post('/url', dataObj);

// Requête DELETE sur /url/ID (Suppression de la ressource)
this.$http.delete('/url/ID');
// Requête GET sur /url/ID (Chargement d'une ressource)
this.$http.get('/url/ID');
// Requête PUT sur /url/ID (Mise à jour de la resource)
this.$http.put('/url/ID', dataObj);
// Requête HEAD sur /url/ID (Mise à jour de la resource)
this.$http.put('/url/ID', dataObj);
```

## Promise

Les données transmises avec les méthodes de VueResource retournent des **Promises**, on doit utiliser la méthode `then(acceptCallback, rejectCallback)` pour traiter les résultats :

```javascript
this.$http.get('/url').then(
   // --- SUCCES
   function( response ){
      // Traitement de la réponse ici
      console.log(response.body);
   },
   // --- ERREUR
   function( error ){
      // Traitement de la réponse ici
      console.error(error.body);
   }
);
```
