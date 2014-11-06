% TP XSLT
% Technologies XML
% Stéphane Bouvry, 2014

# Préambule

Téléchargez les fichiers du TP à l'adresse <http://www.jacksay.com/cours/dist/tp/xml-2-2.zip>. Vous trouverez également les supports de cours à l'adresse <http://www.jacksay.com/cours/dist/index.html>.

# Exercice 1

Cet exercice concerne des transformations du document **films.xml** que vous avez déjà récupéré.

- Mettre en place une transformation XSLT permettant d’afficher les films dans un navigateur Web : transformer le document XML en un document HTML (le rendu peut ressembler à films1.html).
- Mettre en place une transformation XSLT permettant de générer un document HTML affichant la liste des réalisateurs. Pour chaque réalisateur, mentionner la liste des films qu’il a produits ((le
rendu peut ressembler à films2.html)
- Mettre en place une transformation XSLT générant un fichier XML, contenant les films américains.
- Mettre en place une transformation XSLT transformant le fichier créé à la question précédente
afin de l’afficher dans un navigateur Web.

# Exercice 2

Soit le document xml suivant :

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<test>
	<nombre>69</nombre> 
	<nombre>12345 </nombre> 
	<nombre>743</nombre>
	<nombre>915743 </nombre> 
</test>
```

Produire la feuille de style choose.xsl afin d’obtenir le document XML ci-dessous où un nombre est considéré petit s’il est inférieur à 1000 et est grand sinon.

```xml
<?xml version="1.0" encoding="UTF-8"?> 
<ordre>
	<remarque>
		Les nombre sont les suivants :
	</remarque>
	<nb type="petit nombre">69</nb>
	<nb type="grand nombre">12345</nb>
	<nb type="petit nombre">743</nb>
	<nb type="grand nombre">915743</nb>
</ordre>
```
