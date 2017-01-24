% UMDN4A : Evaluation
% Stéphane Bouvry
% DNR2i, Université de Normandie, 2017

Vous allez réaliser en groupe (2 personnes) une application *serious game* permettant aux enfants de primaire (CE1 et plus) de réviser les tables de multiplication. L'application proposera plusieurs mode de jeu :

- Mode apprentissage pour réviser une table spécifique
- Mode évaluation qui permettra de s'évaluer sur l'ensemble des tables


# Réalisation minimale

## Navigation
L'application sera composée d'un écran d'accueil ou l'enfant pourra choisir entre les 2 modes de jeu.

S'il choisi le mode *apprentissage*, un écran de choix de la table s'affichera avant de commencer le jeu, si il choisi le mode *évaluation*, le jeu commencera directement.

## Le jeu

Une partie se déroule toujours de la même manière. Le jeu va charger 10 opérations (de préférence dans le désordre). Puis poser les opérations les unes après les autres.

L'enfant disposera d'une interface simple dans laquelle il pourra choisir la bonne réponse parmis celles proposées par le jeu. En mode apprentissage, les réponses proposées sont toutes celles disponibles pour la table choisie, en mode *évaluation* vous devrez déterminer quelles choix lui proposer (Vous devrez expliquer dans le rapport comment vous avez résolu ce choix).

En cas d'erreur, un dispositif visuel lui indiquera qu'il s'est trompé (par exemple, la réponse qu'il a choisi passe en rouge), puis il devra choisir une autre réponse parmis celle restante.

A la fin, un écran indiquera à l'enfant le nombre d'erreur qu'il a fait, le temps total qu'il a réalisé, ainsi qu'un bouton pour revenir à l'accueil.

## Données

L'application devra mémoriser pour chaque opération les bonnes/mauvaises réponses ainsi que le temps de réponse. Vous stoquerez ces données directement dans le navigateur en utilisant les localStorage.

## S'évaluer

Un écran permettra de visionner les résultats globaux pour chaques tables. Cet écran permettra à l'enfant (et aux parents) de voir en un coup d'oeil les opérations qui posent problèmes en s'appuyant sur les données recueillies.


# Réalisations complémentaires

Les propositions suivantes vous permettront de vous distinguer, vous pouvez choisir de n'en réaliser que certaines, il n'y a pas d'ordre ni d'obligation. Rien ne vous empèche d'enrichir l'application avec vos popres idées

## Favoriser les opérations à problème

Essayez d'ajouter dans la partie un algorithme qui prend en compte les erreurs faites afin de favoriser les opérations sur lesquelles l'enfant s'est trompé. Ces opérations à problème pourront ainsi appraître plusieurs fois dans la même partie.

## Sur les doigts

Quand un enfant ne connait pas le résultat, il va compter sur ces doigts, ce qui va fortement influer sur le temps de réponse, essayer d'utiliser cette donnée (le temps de réponse) pour favoriser la réapparition des opérations où le temps de réponse est le plus long.

## Sur les doigt (étalonnage)

Le temps de réponse "normal" n'est pas une constante universelle, elle peut fortement varier d'une personne à l'autre en fonction de son age et de son aisance face à l'outils informatique. En vous appuyant sur une table simple (par exemple la table de 1 ou la table de 10), essayer de déterminer un temps de réponse normal.

## Plusieurs profils

Les données de l'application (les stats) sont initialement prévues pour un enfant, essayer de la modifier pour permettre aux parents de créer plusieurs enfants (il faudra ajouter un élément d'interface permettant de choisir un profil et en créer un).

## Sauvegarde

Trouvez un moyen de permettre la sauvegarde de la progression (les stats) dans un fichier.

## Mode évaluation débloqué

Essayer de verrouiller le mode *évaluation* tant que l'enfant n'a pas fini le mode *apprentissage* (fait au moins une fois chaque table, peu importe le nombre d'erreur).


# Rendu

L'application sera accessible sur l'espace personnel d'un des étudiants et s'accompagnera d'un petit rapport où vous décrirez la structure du modèle de donnée et où vous pourrez expliquer vos choix ergonomiques et algorithmiques si besoin. Si vous n'arrivez pas à implémenter une fonctionnalité, n'hesitez pas décrire votre intention. (4 pages max).

L'application **doit fonctionner**

L'évaluation se basera sur les fonctionnalités de base mises en place, les fonctionnalités complémentaires, sur l'ergonomie et les choix graphiques, la qualité du code (bien structuré et commenté).
