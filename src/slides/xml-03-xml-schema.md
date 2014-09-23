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

<table class="table-bordered">
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
- les valeurs **des éléments ne contenant QUE du texte** `<xsd:element name="pouet" type="TYPESIMPLE" />`{.xml}

---

### Exemple

Pour valider l'élément suivant : 

```xml
<pseudo>Le gouverneur</pseudo>
```
. . .
On utilisera : 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<xsd:element name="pseudo" type="xsd:string" />
</xsd:schema>
```


---

### Chaînes de caractères

- `xsd:string` : Normale
- `xsd:NMTOKEN` : Chaîne contenant des lettres, chiffres et/ou `.-_:`
- `xsd:NMTOKENS` : Un liste de token 
- `xsd:language` : Un code langue (fr ou fr-FR)
- `xsd:ID` : Un identifiant unique
- `xsd:IDREF` : Un identifiant utilisé dans le document
- `xsd:IDREFS` : Liste d'identifiants

---

### Dates / heures

- `xsd:time` : HH:MM:SS.sss
- `xsd:date` : YYYY:MM:DD
- `xsd:datetime` : <date>T<time>
- `xsd:gYear` : Année sous la forme YYYY
- `xsd:gMonth` : Mois sous la forme MM
- `xsd:gDay` : Jour sous la forme DD
- `xsd:duration` : une durée 
- etc...

---

### Types numériques

- `xsd:int` : Entier
- `xsd:unsignedInt` : Entier positif
- `xsd:decimal` : Un nombre décimal
- etc (beaucoup)

---

### Autres types

- `xsd:anyURI` : Une URI
- `xsd:boolean` : true / false

---

Listes complètes des types simples (et expliqués) \ 
<http://fr.openclassrooms.com/informatique/cours/structurez-vos-donnees-avec-xml/schema-xml-les-types-simples>

---

## Définir ces propres <br/> types simple

---

On peut créer ces propres types : 

```xml
<xsd:simpleType name="nomDuType">
	<!-- definition du type simple ici -->
</xsd:simpleType>
```

---

Ensuite on définit des règles pour ce type : 

- `xsd:restriction` : Restriction sur un type donné
- `xsd:list` : Liste de valeur d'un type donné séparé par des espaces
- `xsd:union` : fusion de types

---


### Restriction 

La **restriction** s'applique sur un type initiale.

```xml
<xsd:simpleType name="nomDuType">
	<xsd:restriction base="xsd:string">
		<!-- Suite ici -->
	</xsd:restriction>
</xsd:simpleType>
```

---

La restriction s'applique à différents critères appellés **facettes**

```xml
<!-- Taille de 16 caractères -->
<xsd:simpleType name="chaineDe16Caracteres">
	<xsd:restriction base="xsd:string">
		<xsd:length value="16"/>
	</xsd:restriction>
</xsd:simpleType>
```

---

Selon le type initiale, différentes facettes sont disponibles :

- `enumeration` : Une liste de valeur
- `fractionDigits` : Nombre de décimales
- `length` : Taille fixe
- `maxInclusive` : Valeur maximum (inclus)
- `maxExclusive` : Valeur maximum (exclus)
- `maxLength` : Taille maximum
- `minExclusive` : Valeur minimum (exclus)
- `minInclusive` : Valeur minimum (inclus)
- `minLength` : Taille minimum
- `pattern` : Une expression régulière
- `totalDigits` : Nombre précis de décimal
- `whitspace` : Gestion des espaces

---

### Exemple d'énumération

```xml
<xsd:simpleType name="camp">
	<xsd:restriction base="xsd:string">
		<xsd:enumeration value="Méchant"/>
		<xsd:enumeration value="Gentil"/>
		<xsd:enumeration value="Neutre"/>
		<xsd:enumeration value="Pleutre"/>
	</xsd:restriction>
</xsd:simpleType>
```

---

### Fonctionnement de Pattern

Utilise des expressions régulières classique : 

- `*` : L'occurence précédente 0 fois ou plus
- `+` : L'occurence une fois ou plus
- `?` : L'occurence 0 ou une fois
- `[A-Z]` : Une lettre entre A et Z
- `[0-9]` : Un nombre entre 0 et 9
- etc...

---

### Exemple d'expression régulière

```xml
<xsd:simpleType name="chaineMinuscule">
	<xsd:restriction base="xsd:string">
		<xsd:pattern value="[a-z]*"/>
	</xsd:restriction>
</xsd:simpleType>
```

---

### Déclarer un type

Quand un type simple n'est utilisé qu'une seule fois, on peut le déclarer directement dans un élement : 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<xsd:element name="code">
		<xsd:simpleType>
			<xsd:restriction base="xsd:string">
				<xsd:pattern value="[a-z0-9]*"/>
			</xsd:restriction>
		</xsd:simpleType>
	</xsd:element>
</xsd:schema>
```

Dans ce cas, la balise `element`{.xml} n'aura pas d'attribut type.

---

### Bonne pratique

Recommandation : Mieux vaut déclarer les types séparement : 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<xsd:schema xmlns:xsd="http://www.w3.org/2001/XMLSchema">
	<xsd:element name="type" type="turlututu" />

	<!-- Mes types simples -->
	<xsd:simpleType name="turlututu">
		<xsd:restriction base="xsd:string">
			<xsd:pattern value="[a-z0-9]*"/>
		</xsd:restriction>
	</xsd:simpleType>
</xsd:schema>
```

---

### xsd:list

Valide une liste de valeur séparée par des espaces : 

```xml
<!-- Mes types simples -->
<xsd:simpleType name="turlututu">
	<xsd:list itemType="xsd:integer"/>
</xsd:simpleType>
```

valide : 
```xml
<element>962 42 78 1567</element>
```

---

### xsd:union

Fusion de types : 

```xml
<!-- Noms de couleurs prédéfinit -->
<xsd:simpleType name="nomCouleur">
	<xsd:restriction base="xsd:string">
		<xsd:enumeration value="red"/>
		<xsd:enumeration value="green"/>
		<xsd:enumeration value="blue"/>
	</xsd:restriction>
</xsd:simpleType>

<!-- Couleurs hexadécimales -->
<xsd:simpleType name="hexadecimal">
	<xsd:restriction base="xsd:string">
		<xsd:pattern value="#[A-F0-9]{6}"/>
	</xsd:restriction>
</xsd:simpleType>

<!-- Fuuuuuuusion -->
<xsd:simpleType name="hexaOuNomCouleur">
	<xsd:union memberTypes="hexadecimal nomCouleur" />
</xsd:simpleType>
```

---

On peut bien sûr les combiner...

```xml
<!-- Liste de valeurs hexadécmales -->
<xsd:simpleType name="listeHexadecimale">
	<xsd:list itemType="typeHexa" />
</xsd:simpleType>

<!-- Couleur hexadécimale -->
<xsd:simpleType name="typeHexa">
	<xsd:restriction base="xsd:string">
		<xsd:pattern value="#[A-F0-9]{6}"/>
	</xsd:restriction>
</xsd:simpleType>
```

---

## Les types complexes

---

### {data-background="warning"}

Attention, Les types complexes concernent : 

- un élément contenant des éléments (on parle de **contenu complexe** ),
- un élément ayant des attributs (**contenu simple**)

---

## Type complexe <br/> Contenu complexe

Elément contenant d'autes éléments.

---

## Déclaration

```xml
<xsd:element name="personnage">
	<xsd:complexType>
		<!-- Contenu -->
		<!-- Attributs -->
	</xsd:complexType>
</xsd:element>
```

Comme pour les types simples, on peut isoler la déclaration : 

```xml
<xsd:element name="personnage" type="typePersonnage" />

<xsd:complexType name="typePersonnage">
	<!-- Contenu -->
	<!-- Attributs -->
</xsd:complexType>
```

## Contenu

Un type complexe peut décrire sa structure avec : 

- `xsd:sequence` : séquence d'éléments
- `xsd:all` : Séquence aléatoire d'éléments
- `xsd:choice` : Au choix parmis ceux proposés
- Et des contraintes sur la quantité d'éléments

---

### xsd:sequence

```xml
<xsd:complexType  name="typePersonnage">
	<!-- Contenu -->
	<xsd:sequence>
		<xsd:element   name="nom" type="xsd:string" />
		<xsd:element   name="prenom" type="xsd:string" />
		<xsd:element   name="pseudo" type="xsd:string" />
	</xsd:sequence>
	<!-- attributs -->
</xsd:complexType>
```

---

### xsd:all

Avec `xsd:all`, l'ordre d'apparition des éléments \
 n'a aucune importance.

```xml
<xsd:complexType  name="typePersonnage">
	<!-- Contenu -->
	<xsd:all>
		<xsd:element   name="nom" type="xsd:string" />
		<xsd:element   name="prenom" type="xsd:string" />
		<xsd:element   name="pseudo" type="xsd:string" />
	</xsd:all>
	<!-- Attributs -->
</xsd:complexType>
```

---

### xsd:choice

Avec `xsd:choice`, seul un des 3 éléments devra être présent.

```xml
<xsd:complexType  name="typePersonnage">
	<!-- Contenu -->
	<xsd:all>
		<xsd:element   name="nom" type="xsd:string" />
		<xsd:element   name="prenom" type="xsd:string" />
		<xsd:element   name="pseudo" type="xsd:string" />
	</xsd:all>
	<!-- Attributs -->
</xsd:complexType>
```

---

### min/max occurs

Les propriétés `minoccurs` et `maxoccurs` permettent de préciser le nombre de fois ou l'élément peut apparaître : 

```xml
<xsd:element name="personnagesFavoris">
	<xsd:complexType>
		<xsd:sequence>
			<xsd:element name="personnage" type="typePersonnage" 
				minoccurs="1" 
				maxoccurs="5" />
		</xsd:sequence>
	</xsd:complexType>
</xsd:element>

<xsd:complexType  name="typePersonnage">
	<xsd:sequence>
		<xsd:element name="nom" type="xsd:string" />
		<xsd:element name="prenom" type="xsd:string" />
		<xsd:element name="pseudo" type="xsd:string" />
	</xsd:sequence>
</xsd:complexType>
```

---

## Attributs

---

On déclare la présence des attributs dans la balise `<xsd:complexType>...</xsd:complexType>`{.xml} **APRES** le contenu

```xml
<xsd:complexType  name="monType">
	<!-- Contenu -->
	...
	<!-- Attributs ICI -->
	<xsd:attribut name="attribut1" type="xsd:string" />
	<xsd:attribut name="attribut2" type="xsd:string" />
	etc...
</xsd:complexType>
```


---

Exemple: un attribut `camp` contenant une chaîne de caractère.

```xml
<xsd:element name="personnage" type="typePersonnage" />

<xsd:complexType  name="typePersonnage">
	<!-- Contenu -->
	<xsd:sequence>
		<xsd:element name="nom" type="xsd:string" />
		<xsd:element name="prenom" type="xsd:string" />
	</xsd:sequence>
	<!-- Attributs -->
	<xsd:attribut name="camp" type="xsd:string" />
</xsd:complexType>
```

Valide : 

```xml
<personnage camp="Woodbury">
	<nom>Phillip</nom>
	<prenom>Blake</prenom>
</personnage>
```

---

Les attributs sont toujours de type simple, \
comme les contenu textuel : 

```xml
<xsd:complexType  name="typePersonnage">
	<!-- Contenu -->
	...
	<!-- Attributs -->
	<xsd:attribut name="camp" type="typeCamp" />
</xsd:complexType>

<!-- Noms des camps -->
<xsd:simpleType name="typeCamp">
	<xsd:restriction base="xsd:string">
		<xsd:enumeration value="méchant"/>
		<xsd:enumeration value="gentil"/>
		<xsd:enumeration value="neutre"/>
	</xsd:restriction>
</xsd:simpleType>
```

---

### Contraintes d'attributs

Les attributs peuvent avoir des contraintes : 

- `use` : Présence de l'attribut 
	- `required` : Obligatoire
	- `optional` : Optionnelle
	- `prohibited` : Interdite
- `default` : Valeur par défaut
- `fixed` : Valeur fixe


---

## Type complexe, <br/> contenu simple

Cela permet de valider un élément **avec des attributs**,

mais qui ne contient que du texte.

La syntaxe est *charmante*...

---

D'abord c'est un type complexe, car il contient des attributs : 

```xml
<xsd:complexType name="monType">
	<!-- -->
</xsd:complexType>
```

---

Son contenu est simple (texte) :

```xml
<xsd:complexType name="monType">
	<xsd:simpleContent>
		<!-- pas fini... -->
	</xsd:simpleContent>
</xsd:complexType>
```

---

Et ce contenu simple étend un type simple

```xml
<xsd:complexType name="monType">
	<xsd:simpleContent>
		<xsd:extension base="xsd:string">
			<!-- toujours pas fini -->
		</xsd:extension>
	</xsd:simpleContent>
</xsd:complexType>
```

---

Enfin on définit les attributs : 

```xml
<xsd:complexType name="monType">
	<xsd:simpleContent>
		<xsd:extension base="xsd:string">
			<xsd:attribut name="monAttribut" type="xsd:string" />
		</xsd:extension>
	</xsd:simpleContent>
</xsd:complexType>
```

# Annexe

- Les cours de Gilles Changnon : <http://www.gchagnon.fr/cours/xml/schema.html>
- XML Schema sur openclassroom : <http://fr.openclassrooms.com/informatique/cours/structurez-vos-donnees-avec-xml/schema-xml-introduction>

