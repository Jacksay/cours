% BOWER
%  ![](../images/bower-logo.svg)
% Gestionnaire de paquet Javascript

# Présentation

## C'est quoi ?

**Bower** est un **gestionnaire de paquet pour javascript** basé sur NodeJS (comparable à NPM pour la gestion des paquets Node).

A l'instars de Ivy ou Maven pour Java, Composer pour PHP, **Bower** va gérer automatiquement les dépendances.

## Installation

Bower est un outil **NodeJS** (Node doit donc être installé). Dans la console de Node JS on peut installer bower avec la commande :

```bash
npm install bower
```

On peut également utiliser l'option `-g` pour une installation globale (necessite les droits d'administrateur)

```bash
npm install -g bower
```

## Installation non-root

Si on a pas les droits root, on peut installer bower pour l'utilisateur courant :

```bash
cd ~
npm install bower
cat "alias bower='~/node_modules/bower/bin/bower'" >> ~/.bashrc
```

# Utilisation simple (OKLM)

## Rechercher un paquet

On recherche avec la commande `bower search ???` :

```bash
bower search jquery
```

Donne :

```plain
Search results:

    jQuery https://github.com/jquery/jquery.git
    jquery https://github.com/jquery/jquery-dist.git
    jquery.x https://github.com/jljLabs/jquery.x.git
    jt_jquery https://github.com/vicanso/jt_jquery.git
    jquery.Q https://github.com/jsbuzz/jQuery_Q.git
    jquery-m https://github.com/meetup/jquery.git
    jquery.j2d https://github.com/fsggs/jquery.j2d.git
    jquery.hx https://github.com/millennialmedia/jquery.hx.git
    jquery-ts https://github.com/andraaspar/jquery-ts.git
    jquery-tm https://github.com/trymore/jquery-tm.git
...
```


## Installer un paquet

Bower permet d'installer des librairies Javascript automatiquement :

```bash
bower install jquery
```

Par défaut, les fichiers sont installés dans le dossier **bower_components**


# Projet bower

## bower init

L'initialisation d'un projet bower permet de partager un projet, mais surtout de conserver une trace des dépendances utilisées dans le projet.

```bash
bower init
```

Il vous posera une série de question... Pour obtenir un fichier **bower.json** :

```javascript
{
  name: 'demo-bower',
  version: '0.0.0',
  authors: [
    'Jean-Claude Dus <jeanclaude.dus@unicaen.fr>'
  ],
  license: 'MIT',
  ignore: [
    '**/.*',
    'node_modules',
    'bower_components',
    'test',
    'tests'
  ]
}
```

## --save --save-dev

l'initialisation du projet permet de mémoriser les installations avec les arguments **--save** et **--save-dev**

```bash
bower install --save backbone bootstrap
```

Dans le fichier **bower.json**

```javascript
{
  "name": 'demo-bower',
  // etc...
  "dependencies": {
    "backbone": "~1.3.3",
    "bootstrap": "~3.3.7"
  }
}
```

## Update

Par la suite, vous pouvez mettre à jour les dépendances

```bash
bower update
```

Et Bower d'occupera de mettre à jour les librairies et leurs dépendances. En cas de conflit, tout sera indiqué et bower vous demandera ce qu'il doit faire pour résoudre le problème. (Quelles versions utiliser).

## Install

Si l'on récupère un projet avec un bower.json, on peut installer les dépendances en utilisant install :

```bash
bower install
```

## Install de gosu

Il est également possible de spécifier à bower la version que l'on souhaite installer (le tilde permet d'indique la version approximative) :

```bash
# Installe moi Bootstrap V2QuelqueChose
bower install --save bootstrap#~2
```

On peut également indiquer des *ranges*, une version minimum/maximum, plus d'info sur la documentation <https://bower.io/docs/api/#install>, mais cela respect les standards usités par Github.

## .bowerrc

Le fichier `.bowerrc` permet d'indiquer à bower des paramètres :

 - Emplacement pour l'installation
 - Réglage du proxy
 - etc...

## Emplacement des librairies

Le fichier **.bashrc** est généralement utiliser pour indiquer où bower doit déposer les fichiers :

```javascript
{
    "directory":"src/js/vendor"
}
```

## !$? de proxy

Lorsque l'on est derrière un proxy, on peut le préciser à bower si besoin (dans le fichier **.bowerrc**), mais normalement, c'est les variables d'environnements qui gère ça :P

```javascript
{
    "proxy":"http://proxy.domain.tld:3128",
    "https-proxy":"http://proxy.domain.tld:3128"
}
```

et avec une authentification :

```javascript
{
    "proxy":"http://utilisateur:motdepasse@proxy.domain.tld",
    "https-proxy":"http://utilisateur:motdepasse@proxy.domain.tld"
}
```

## Proxy Github

En cas de problème d'accès, il est possible que ça bloque lors de l'accès à Github :

```bash
# Dans la console
git config --global http.proxy http://localhost:3128
git config --global https.proxy http://localhost:3128
```

Généralement, un configuration système standard doit fonctionner :

```bash
# ~/.bashrc
export http_proxy=http://fr-proxy.example.com:3128
export https_proxy=http://fr-proxy.example.com:3128
```

# MERCI
