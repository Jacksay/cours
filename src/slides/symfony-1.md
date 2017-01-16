% ![Symfony](../images/symfony.png)
% Introduction

# Présentation

## Application Web

Une application web est utilisée pour donner une **réponse HTTP** à une **requête**. Cette **réponse** dispose d'un code HTTP indiquant l'état général de la réponse 100, 200, 300, 400, 500

Le contenu de cette **réponse** se présente sous la forme d'une **ressource** qui peut être un fichier HTML, JS, CSS, image, etc...

Généralement, la construction de cette réponse sera **dynamique** car elle puisera l'information dans une source de donnée type SGBD.

## Schéma



## Symfony

**Symfony** est un *framework* PHP utilisé pour construire des réponses HTTP à des requêtes HTTP. Pour cela, il aggrège un ensemble de **composants** :

 - **HttpFoundation** qui permet de construire des objets pour analyser une requête HTTP et construire des réponses HTTP.
 - **Routing** qui permet d'analyser une requête HTTP pour exécuter du code correspondant
 - **Twig** (et **templating**)
 - **Doctrine**
 - **Dependency Injection**
 - **Cache**



# Premiers pas

## Installation

## Page par défaut

# Configuration

## Base de donnée SQLite

La base de donnée est configurée dans le fichie `/app/config/parameters.yml` :

```yaml
# This file is auto-generated during the composer install
parameters:
    # ...
    # Emplacement du fichier pour la BDD
    # kernel.root est par défaut le dossier 'app' du projet
    database_path: "%kernel.root_dir%/fichier.db3"
```

## PDO drivers

Par défaut, Symfony est configuré pour les bases de données MySQL, en utilisant SQLite, on doit modifier le drivers, et précisier le chemin du fichier de la bdd :

```yaml
# /app/config/config.yml
doctrine:
    dbal:
        # Le drivers Sqlite
        driver:   pdo_sqlite

        #...

        # L'emplacement (précisé dans parameters.yml)
        path:     "%database_path%"

```

## Création de la base de données

Dans la console, on peut ensuite utiliser l'utilitaire pour générer le fichier de base de données :

```bash
php app/console doctrine:database:create
```
