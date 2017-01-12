% ![Symfony](../images/symfony.png)
% Introduction

# Présentation

## c'est quoi ?


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
# /app/config/config/yml
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

