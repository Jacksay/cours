% Technologies XML
% Stéphane Bouvry
% Caen, 2014

# XML Schema {data-background="./../images/bg-dtd.jpg"}
Validation XML

---

## Avantages

- Permet de valider un document XML (comme une DTD)
- Utilise la syntaxe XML
- Orienté objet : possibilité d’extension ou de restriction des types existants ;
- Nombreux types de base (44), que l'on peut étendre
- Gestion des cardinalités, nombre d'occurences

---

## Fichier XSD

Ce document est un fichier texte contenant du XML ;

- Le document doit être valide et conforme ;
- Il contient un prologue et un arbre d’éléments ;
- Les noms des balises XML-Schema sont préfixés par "*xsd*" ;
- L’élément racine du document correspond à la balise `<xsd:schema>`{.xml}.

---

### Document de base

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<!-- Déclarations ICI -->
</xsd:schema>
```

---

## Syntaxe

---

### Elément

```xml
<xsd:element name="element" type="type" />
```

Exemple :
```xml
<xsd:element  name="prenom" type="xsd:string"/>
<xsd:element  name="age" type="xsd:int"/>
<xsd:element  name="dateAnninv" type="xsd:date"/>
```

---

## Les types

---

### Introduction

- Les types XML-Schéma peuvent être simples ou complexes.
- Ils sont utilisés lors de la définition d’éléments et d’attributs.
- Ils peuvent également être utilisés afin de définir de nouveaux types.
- Les types simples (simpleType) ne possèdent ni attributs, ni enfants.
- Il existe un grand nombre de types simples prédéfinis et il est également possible de les modifier afin d’en définir de nouveaux.

---

### Organisation des types

<table>
	<thead>
		<tr style="border-bottom: solid thin #999999">
			<th>élément</th>
			<th>Sans attribut</th>
			<th>Avec attribut</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Contenu textuel</td>
			<td>type simple</td>
			<td>type complexe (contenu simple)</td>
		</tr>
		<tr>
			<td>Contenu (élément)</td>
			<td colspan="2">type complexe (contenu complexe)</td>
		</tr>
		<tr>
			<td>Attribut</td>
			<td colspan="2">type simple</td>
		</tr>
	</tbody>
</table>

---

## Types simples

---

Utilisé pour fixer : 

- les valeurs des attributs `<xsd:attribut name="toto" type="TYPESIMPLE" />`{.xml}
- les valeurs **des éléments ne contenant QUE du texte** `<xs:element name="pouet" type="TYPESIMPLE" />`{.xml}

---

### Chaînes de caractères

- `xs:string` : Normale
- `xs:NMTOKEN` : Chaîne contenant des lettres, chiffres et/ou `.-_:`
- `xs:NMTOKENS` : Un liste de token 
- `xs:language` : Un code langue (fr ou fr-FR)
- `xs:ID` : Un identifiant unique
- `xs:IDREF` : Un identifiant utilisé dans le document
- `xs:IDREFS` : Liste d'identifiants

---

### Dates / heures

- `xs:time` : HH:MM:SS.sss
- `xs:date` : YYYY:MM:DD
- `xs:datetime` : <date>T<time>
- `xs:gYear` : Année sous la forme YYYY
- `xs:gMonth` : Mois sous la forme MM
- `xs:gDay` : Jour sous la forme DD
- `xs:duration` : une durée 
- etc...

---

### Types numériques

- `xs:int` : Entier
- `xs:unsignedInt` : Entier positif
- `xs:decimal` : Un nombre décimal
- etc (beaucoup)

---

### Autres types

- `xs:anyURI` : Une URI
- `xs:boolean` : true / false

---

Listes complètes des types simples (et expliqués) \ 
<http://fr.openclassrooms.com/informatique/cours/structurez-vos-donnees-avec-xml/schema-xml-les-types-simples>

---

## Définir ces propres <br/> types simple

---

On peut définir ces propres types par **restriction** d'un type initiale.

Selon le type initiale, la restriction s'applique à différents critères appellés **facettes**

Exemple : Le type `xs:string` a 6 facettes (length, minLength, maxLength, pattern, enumeration, whitspace)

---

## Les types complexes

---

### {data-background="#CC0000"}

Attention, Les types complexes concernent : 

- un élément contenant des éléments (on parle de **contenu complexe** ),
- un élément ayant des attributs (**contenu simple**)




