# VueJS

## Etape 1 : Liste des personnages

A partir des données fournies et en utilisant **VueJS**(https://vuejs.org/), affichez les informations pour obtenir ce type de résultat. Vous pourrez vous aider d'un *framework* tel que **Bootstrap** pour gérer le rendu et la mise en page.

![Exemple de rendu](../images/vue/etape1.png)

Si les données ne proposent pas d'image, affichez une image par défaut.


## Etape 2 : Menu d'accès rapide

Ajoutez un menu latéral permettant au click de faire défiler la page sur le personnage correspondant.

![Accès rapide](../images/vue/etape2.png)


## Etape 3 : Recherche

Ajoutez dans le menu latéral un champ de recherche rapide qui permettra de filtrer les personnages sur le nom, le prénom ou le surnom.

![Recherche](../images/vue/etape3.png)

## Etape 4 : Tri

Dans le menu latéral, ajoutez un élément d'interface permettant de trier les informations (Par nom, prénom).

![Système de tri](../images/vue/etape4.png)


**Extra** : Cliquer sur un tri provoque le tri dans l'ordre croissant, cliquer à nouveau trie dans l'ordre décroissant. Essayez de  trouver un dispositif visuel pour indiquer si le tri est croissant ou décroissant.

## Etape 5a : Supprimer

Sur chaque personnage, ajoutez un bouton supprimer fonctionnel

## Etape 5b : Editer

Sur chaque personnage, ajoutez un bouton éditer. Il ouvrira une fenêtre modale contenant un formulaire pour éditer automatiquement (sans bouton enregistrer) le contenu de la fiche correspondant.

![Modification des données](../images/vue/etape5.png)

Dans un deuxième temps et en vous appuyant sur FileReader, trouvez une solution pour mettre à jour l'image.

## Etape 6 : Nouveau

Créer une fonctionnalité "Nouveau" permettant d'ajouter un nouveau personnage à la liste.

## Etape 7 : Store

Modifiez le code pour permettre d'enregistrer les informations dans le navigateur en utilisant les LocalStorage. Si le localStorage est vide, application utilisera le jeu de données par défaut.

Vous ajouterez également un bouton permettant de sauvegarder fiches personnages dans un fichier, puis un autre pour les charger les données depuis ce même fichier.

## Extras

Autoriser l'utilisation du format *Markdown* dans la biographie des personnages.

Les plus affuté essayeront de remplacer les "Prénom Nom" de la description par des ancres actives vers la fiche du personnage correspondant.
