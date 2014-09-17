% Technologies XML
% Stéphane Bouvry
% Caen, 2014


# DTD {data-background="./../images/bg-dtd.jpg"}
Document Type Definition

---

Voici ce que vous attendez :
```xml
<?xml version="1.0" encoding="UTF-8"?>
<personnages>
	<personnage identifiant="1">
		<nom>Grimes</nom>
		<prenom>Rick</prenom>
		<bio><![CDATA[texte]]></bio>
		<illustration type="vignette">rick-grimes.jpg</illustration>
	</personnage>
	<personnage identifiant="2">
		<nom>Glenn</nom>
		<prenom>Rhee</prenom>
		<bio><![CDATA[texte]]></bio>
		<illustration type="vignette">glenn-rhee.jpg</illustration>
	</personnage>
	<personnage identifiant="3">
		<nom>Blake</nom>
		<prenom>Philip</prenom>
		<pseudo>Le gouverneur</pseudo>
		<bio><![CDATA[texte]]></bio>
		<illustration type="vignette">philip-blake.jpg</illustration>
	</personnage>
</personnages>
```

---

Et ce que vous recevez : 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<characters>
	<character id="1">
		<lastname>Grimes</lastname>
		<firstname>Rick</firstname>
		<bio><![CDATA[texte]]></bio>
	</character>
	<character id="2">
		<lastname>Glenn</lastname>
		<firstname>Rhee</firstname>
	</character>
	<character id="3">
		<lastname>Blake</lastname>
		<firstname>Philip</firstname>
		<nickname>Le gouverneur</nickname>
	</character>
	<character id="4">
		<nickname>Michone</nickname>
	</character>
</characters>
```


---

Un document doit être conforme, mais pour permettre d'être exploité par un système tiers, il doit avoir une stucture définit.

---

Pour valider la structure d'un document XML, \ 
on peut utiliser une **DTD**

---

La DTD permet de déclarer : 

- les éléments,
- les attributs,
- les entitées personnalisées
- la structure des éléments

---

## Déclarer la doctype

La **doctype** permet d'associer à un fichier XML une DTD

---

### DOCTYPE interne

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE arbreXML [
	<!-- DTD directement ici -->
]>
<arbreXML>
	...
</arbreXML>
```

---

### DOCTYPE externe
Permet d'utiliser la même DTD dans plusieurs fichiers XML.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE arbreXML SYSTEM "emplacement/du/fichier.dtd">
<arbreXML>
	...
</arbreXML>
```
---

### DOCTYPE publique

Sous la forme `<!DOCTYPE balise PUBLIC "nom publique" "URL">`{.dtd}

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" 
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
<html>
	...
</html>
```
---

## Contenu de la DTD

---


## déclarer un élément

Permet de fixer le contenu d'un élément sous la forme : `<!ELEMENT nomBalise MODELE>`

---

## EMPTY

L'élément sera vide

```dtd
<!ELEMENT identifiant EMPTY>
```

Valide : 

```xml
<identifiant />
```

---

## ANY

L'élément peut contenir n'importe quel autre élément de la DTD

```dtd
<!ELEMENT arbre ANY>
```

Valide : 

```xml
<arbre>
	<branche>...</branche>
	<arbre>...</arbre>
</arbre>
```

---

## #PCDATA

Données textuelle (attention aux parenthèses)

```dtd
<!ELEMENT nom (#PCDATA)>
```

Valide : 

```xml
<nom>Dus</nom>
<!-- ou -->
<nom><![CDATA[Contenu texte <strong>plus compliqué</strong>]]></nom>

```

---

## élément

L'élément contient l'élément :

```dtd
<!ELEMENT personnage (pseudo)>
```

Valide : 

```xml
<personnage>
	<pseudo>...</pseudo>
</personnage>
```

---

... On peut définir un enchaînement d'éléments \
en les séparant par des vigules : 

```dtd
<!ELEMENT personnage (nom, prenom, bio, illustration)>
```

Valide : 

```xml
<personnage identifiant="1">
	<nom>Grimes</nom>
	<prenom>Rick</prenom>
	<bio><![CDATA[texte]]></bio>
	<illustration type="vignette">rick-grimes.jpg</illustration>
</personnage>
```

---

## Quantifieur

Les quantifieurs permettent de préciser la qualtité d'éléments attendus :

- `*` 0 ou plus
- `+` 1 ou plus
- `?` 0 ou 1 fois

---

```dtd
<!ELEMENT contact (nom, prenom, pseudo?, email+, siteweb*)>
```

Valide : 

```xml
<personnage>
	<nom>Grimes</nom>
	<prenom>Rick</prenom>
	<email>rick.grimes@twd.com</email>
	<siteweb>http://www.magnum-addict.com</siteweb>
</personnage>
```
ou
```xml
<personnage>
	<nom>Blake</nom>
	<prenom>Philip</prenom>
	<pseudo>Le gouverneur</pseudo>
	<email>philip.blake@twd.com</email>
	<email>legouverneur@twd.com</email>
</personnage>
```
---

## Ou

Le caractère pipe `|` permet de définir un OU logique : 
```dtd
<!ELEMENT identite (nom | prenom)>
```

L'élément `identite` ne peut contenir d'un `nom` ou un `prenom`

```xml
<identite>
	<nom>...</nom>
</identite>
<identite>
	<prenom>...</prenom>
</identite>
```

---

Le OU peut être combiné

```dtd
<!ELEMENT identite ((nom, prenom) | pseudo)>
```

L'élément `identite` ne peut contenir qu'un `nom` et un `prenom` OU un `pseudo`

```xml
<identite>
	<nom>...</nom>
	<prenom>...</prenom>	
</identite>
<identite>
	<pseudo>...</pseudo>
</identite>
```


---

### Contenu mixte

Si le contenu d'un élément contient indistinctement du texte ou les éléments indiqués

```dtd
<!ELEMENT paragraphe (#PCDATA | gras | italique)*>
<!ELEMENT gras (#PCDATA)>
<!ELEMENT italique (#PCDATA)>
```

```xml
<paragraphe>
	Texte
	<gras>en gras</gras>
	ou
	<italique>Italique</italique>
	<italique>et encore italique</italique>
</paragraphe>
```

---

## Les attributs

Se déclarent sous la forme : \ 
```
<!ATTLIST nomElement 
	nomAttribut <type> <mode>
>
```

---

## Types

On peut préciser le type d'information : 

- `CDATA` : données textuelles
- `ID` : Identifiant unique
- `IDREF` : Référence à un ID dans le document
- `NMTOKEN` : Un mot sans espace
- `(A|B|C)` : Une liste de valeur

---

## Mode

Et un mode : 

- `#REQUIRED` : Requis
- `#IMPLIED` : Facultatif
- `#FIXED` : Valeur fixe
- `"valeur"` : Valeur par défaut

-----

## Exemple

```dtd
<!ELEMENT personnage (nom,prenom,pseudo?,bio)>

<!ELEMENT nom       (#PCDATA)>
<!ELEMENT prenom    (#PCDATA)>
<!ELEMENT pseudo    (#PCDATA)>
<!ELEMENT bio       (#PCDATA)>

<!ATTLIST personnage 
    id          ID      #REQUIRED 
    idActeur    IDREF   #IMPLIED
    alignement  (méchant | gentil | pleutre | neutre) "neutre"
>
```

---

### Exemple : 

```dtd
<!ELEMENT personne (nom,adresse,telephone*)>
<!ELEMENT nom (#PCDATA)>
<!ELEMENT adresse (numeroRue?,rue,ville)>
<!ELEMENT telephone (#PCDATA)>
<!ELEMENT rue (#PCDATA)>
<!ELEMENT numeroRue (#PCDATA)>
<!ELEMENT ville (#PCDATA)>
<!ATTLIST nom prenom CDATA #REQUIRED>
<!ATTLIST ville codePostal CDATA #REQUIRED>
<!ATTLIST  telephone type (domicile|travail|portable) "
domicile"  #IMPLIED>
```

---

## Entités persos

Variables XML sous la forme `<!ENTITY nomVariable "Valeur">`{.dtd}

---

Exemple : 

```dtd
<!ENTITY auteur "Stéphane Bouvry">
<!ENTITY date "Septembre 2014">
```

Puis dans le XML : 
```xml
<?xml version="1.0" encoding="UTF-8"?>
<cours date="&date;">
	<title>XML</title>
	<auteur>&auteur;</auteur>
</cours>
```

---

## Entités externes

La déclaration d'entité peut être faite dans un fichier séparé, \ 
puis chargée dans la DTD : 

```dtd
<!ENTITY foo SYSTEM "URI">
```

Exemple : 

```dtd
<!ENTITY toto SYSTEM "http://www.w3.org/TR/xhtml1/DTD/xhtml-symbol.ent">
```

On peut utiliser une URL locale : 

```dtd
<!ENTITY toto SYSTEM "mesDTD/entites.ent">
```

---

## Entités paramétriques

Elles sont utilisées **dans la DTD** pour factoriser les déclarations.

```dtd
<!ENTITY % parametre "valeur">
```

Exemple : 

```dtd
<!ENTITY % text "CDATA">
<!ATTLIST ville
	codepostale %text; #REQUIRED
>
```

---

Autre exemple

```dtd
<!-- attributs de base -->
<!ENTITY % attributsDeBase
 "id          ID 		#IMPLIED
  class       CDATA		#IMPLIED
  style       CDATA   	#IMPLIED
  title       CDATA		#IMPLIED"
  >

<!-- Utilisation -->
<!ATTLIST unElement
  %attribursDeBase;
  lang        (fr | en | de)	#IMPLIED
  >

<!ATTLIST unAutreElement
  %attribursDeBase;
  categorie		CDATA	#IMPLIED
  >
```

---

Un bon exemple, la DTD du XHTML : \ 
<http://www.w3.org/TR/xhtml1/dtds.html#a_dtd_XHTML-1.0-Strict>

---

## Limitation
La DTD souffre de limitations : 

- Syntaxe
- Cardinalités
- Typage des données
- Mauvaise prise en charge par les processeurs

---