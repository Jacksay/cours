% Technologies XML
% Stéphane Bouvry
% Caen, 2014

# XPath {data-background="./../images/bg-dtd.jpg"}
Requêtes XML


---

## Présentation

XPath est un langage permettant d’exprimer des requêtes afin de localiser des parties d’un document XML.

- Il est utilisé par XSLT et XQuery
- XPath se base sur la structure arborescente d’un document XML.

---

## Résultat de requête

Une requête XPath 1.0 produit en résultat : 

- un ensemble de nœuds (**NodeSet**), 
- un nombre décimal, 
- une chaîne de caractères 
- un booléen.

---

## Le XML

```xml
<?xml version="1.0" encoding="utf-8" ?>
<personnages>
	<personnage maison="stark">
		<nom>Ned</nom>
		<prenom>Stark</prenom>
	</personnage>
	<personnage maison="stark">
		<nom>Snow</nom>
		<prenom>jon</prenom>
	</personnage>
	<personnage maison="targaryen">
		<nom>Daenerys</nom>
		<prenom>Targaryen</prenom>
	</personnage>
</personnages>
```

---

![](../images/tree-got.jpg)

---

## Requête

Une requête (ou *ou chemin de localisation*) XPath permet de parcourir un arbre XML sous la forme : 

`direction::selecteur[predicat]`

---

### Directions principales

---

![](../images/xpath-axes-parent.jpg)

`parent::* = {<personnages>}`


---

![](../images/xpath-axes-ancestor.jpg)

`ancestor::* = {<personnages>, </>}`

---

![](../images/xpath-axes-ancestor-or-self.jpg)

`ancestor-or-self::* = {<personnage>, <personnages>, </>}`

---

### Autres directions

![](../images/xpath-axes-child.jpg)

`child::* = {<prenom>, <nom>}`

---

![](../images/xpath-axes-child.jpg)

`descendant::* = {<prenom>, <nom>}`

---

![](../images/xpath-axes-descendant-or-self.jpg)

`descendant-or-self::* = {<personne>, <prenom>, <nom>}`

---

### Autres directions (suite)

---

![](../images/XPath-preceding-sibling.jpg)

`preceding-sibling::*`

---

![](../images/XPath-preceding.jpg)

`preceding::*`

---

![](../images/XPath-following-sibling.jpg)

`following-sibling::*`

---

![](../images/XPath-following.jpg)

`following::*`

---

## Attributs

Pour sélectionner un attribut, on utilise `attribute::<attr>`

- `attribute::*` ou `@*` : Tous les attibuts
- `attribute::maison` ou `@maison` : l'attribut *maison*

---

## Nœud courant

Pour faire référence au noeud courant on peut utiliser `self::node()` ou `.`

---


## Chemin absolu

S'exprime par rapport à la racine sous la forme : 

`/noeud1/noeud2/.../noeudCible`

exemple, Sélectionne tous les noeuds *nom* :
```xpath 
/child::personnages/child::personne/child::nom
```

---

## Chemin relatif

S'exprime par rapport au noeud courant : 
`noeud/noeud/.../cible`

exemple (depuis personnes), sélectionner le nom
```xpath
child::personne/child::nom
```

---

## Chemin abrégé, child

Les chemins XPath sont souvent écrit en forme abrégée, l'axe `child::` est implicite. donc 

```xpath 
/child::personnages/child::personne/child::nom
```

peut être écrit : 

```xpath 
/personnages/personne/nom
```

---

## Chemin abrégé

- `/` racine
- `//foo` : tous les noeuds *foo*, <br/> remplace `descendant::foo`
- `.` : Noeud courant, <br/> remplace `self::node()`
- `..` : Noeud parent, <br/> remplace `parent::`
- `@` : Attributs <br/>remplace `attribute::`