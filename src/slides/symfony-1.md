% ![Symfony](../images/symfony.png)
% Introduction

# Présentation

## Application Web

Une application web est utilisée pour donner une **réponse HTTP** à une **requête**. Cette **réponse** dispose d'un code HTTP indiquant l'état général de la réponse 100, 200, 300, 400, 500

Le contenu de cette **réponse** se présente sous la forme d'une **ressource** qui peut être un fichier HTML, JS, CSS, image, etc...

Généralement, la construction de cette réponse sera **dynamique** car elle est générée côté serveur à partir d'informations puisées dans une source de donnée type SGBD.

## Schéma

Entre la requête et le réponse, il y'a symfony

## Symfony : composants

**Symfony** est un *framework* PHP utilisé pour construire des réponses HTTP à des requêtes HTTP. Pour cela, il aggrège un ensemble de **composants** :

 - **HttpFoundation** qui permet de construire des objets pour analyser une requête HTTP et construire des réponses HTTP.
 - **Routing** qui permet de d'associer des méthodes/controlleurs à des URL
 - **Twig** (et **templating**) pour gérer le rendu (HTML)
 - **Doctrine** pour la communication avec la base de données
 - **Dependency Injection** pour organiser les classes et leurs dépendances
 - **Cache** Pour les performances
 - **Yaml** pour gérer le format YAML
 - **Monolog** pour les logs
 - **Swiftmail** pour les mails
 - etc... (et y'en a beaucoup)

D'autres framework/CMS utilisent des composants de symfony (Drupal, EZPublish, Larvel, Wordpress, Silex).

## Symfony : framework

**Symfony** en aggrégeant les composants entre eux fourni également différents outils pour simplifier et cadrer le développement :

 - L'organisation du code
 - Le debuggage
 - La gestion des performances et du Cache
 - La configuration du projet et des environnements de travail (test, dev, prod)


# Premiers pas

## Installation

## Organisation des fichiers

## Bundle

## Page par défaut



# Requète et réponse : Router, controlleur et Twig

## Controlleur

## Routage

## Réponse

## Vue Twig


# Base de données : Doctrine

## Présentation

**Doctrine** est une librairie indépendante intégré par défaut à symfony. Il rempli 2 fonctions :

 - DBAL : Couche d'abstraction pour l'accès aux bases de données
 - ORM : Gestion des données via des POJO (Objets)

Doctrine fournit également un utilitaire en ligne de commande pour simplifier les opérations courantes (Mise à jour de la BDD, génération d'objet, outils de refactoring)

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

## Les POJO (Objets de données)

Le modèle à utiliser dans la base de donnée doit être déclaré dans des classes dans `sr/AppBundle/Entity` :

```php
<?php
namespace AppBundle\Entity;
use Doctrine\ORM\Mapping as ORM;
/**
 * @ORM
 */
class Produit {
    /**
     * CLEF PRIMAIRE (Obligatoire)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    // Les autres champs
    /**
     * @ORM\Column(type="string", length=255)
     */
    private $label;
    // etc...
}
```

## Accès aux champs

Pour rendre les champs accessibles, on déclare des getters/setters :

```php
<?php
    // ID en lecture seule
    public function getId(){
        return $this->id;
    }

    public function setLabel($label){
        $this->label = $label;
        return $this;
    }

    public function getLabel(){
        return $this->label;
    }
```

## Ligne de commande

Doctrine propose un utilitaire en ligne de commande pour générer les pojos :

```bash
bin/app doctrine:generate:entity
```    

## Utilisation de doctrine : ajout

Depuis un controlleur :

```php
<?php
// On cré le produit et on l'hydrate
$produit = new Produit();
$produit->setLabel($request->get('label'));

// On demande à Doctrine de prendre en charge l'entité
$this->getDoctrine()->getEntityManager()->persist($produit);

// On demande à doctrine d'envoyer les changements
$this->getDoctrine()->getEntityManager()->flush();
```
