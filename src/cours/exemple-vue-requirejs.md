% Usage de RequireJS avec VueJS
% Stéphane Bouvry
% DNR2i, Université de Normandie, 2017


# Préparation

## Structure

```
+js
   +lib
      - requirejs.js
      - vue.js
      - text.js
   +templates
      - app.vue
- index.html
```

## Librairies

Télécharger les librairies et les ranger dans le dossier créé plus tôt `js/lib` :

- Vue <https://unpkg.com/vue/dist/vue.js>
- RequireJS <http://requirejs.org/docs/release/2.3.2/minified/require.js>
- RequireJS text <https://raw.githubusercontent.com/requirejs/text/master/text.js>

## template

Créer un fichier `js/templates/app.vue`avec le code suivant :

```html
<div class="container">
   <h1>Mon Application</h1>
   <p>{{ message }}</p>
</div>
```

# INDEX.HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
   <meta charset="UTF-8">
   <title>Document</title>
</head>
<body>
   <div id="app"></div>

   <!-- On inclus require js -->
   <script src="js/require.js"></script>


   <script>

   ////////////////////////////////// Emplacement des librairies (RequireJS)
   requirejs.config({
      // Emplacement racine
      baseUrl: 'js',

      // Important, les emplacement des fichiers sont indiqués
      // SANS l'extension .JS
      paths: {
         'text': 'lib/text',
         'vue': 'lib/vue'
      }
   });

   //////////////////////////////// Application
   require(['vue', 'text!templates/app.vue'], function(Vue, templateApp){
      // Ce code n'est exécuté que quand les fichiers
      // indiqués sont chargés
      new Vue({
         el: '#app',
         data: {
            message: "Hello world"
         },
         template: templateApp
      })
   });
   </script>
</body>
</html>
```
