% TP XSLT (Correction)
% Technologies XML
% Stéphane Bouvry, 2014

# Exercice 1

Mettre en place une transformation XSLT permettant d’afficher les films dans un navigateur Web : transformer le document XML en un document HTML (le rendu peut ressembler à films1.html).

**Solution** : En utilisant des `for-each`
```xslt
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Format de sortie XHTML strict -->
    <xsl:output
            encoding="utf8"
            method="xml"
            indent="yes"
            doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
            doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
            />

    <!-- Template de départ -->
    <xsl:template match="/">
        <html>
            <head>
                <meta http-equiv="Content-Type"
                      content="text/html;charset=utf-8"/>
                <title>Films</title>
            </head>
            <body>
                <h1>Liste des films</h1>
                <xsl:apply-templates select="/films/film"/>
            </body>
        </html>
    </xsl:template>

    <!-- Template de rendu des films -->
    <xsl:template match="film">
        <div class="film">
            <h2>
                <xsl:value-of select="titre"/> (<xsl:value-of select="@annee"/>)
            </h2>
            <p>Genre :
                <xsl:value-of select="genre"/>
            </p>
            <p>Pays :
                <xsl:value-of select="pays"/>
            </p>
            <xsl:variable name="roles" select="roles/role"/>
            <xsl:if test="count($roles) > 0">
                <h3>Rôles</h3>
                <ul>
                    <xsl:for-each select="$roles">
                        <li>
                            <xsl:value-of
                                    select="concat(intitule, ' (', prenom, ' ', nom, ')')"/>
                        </li>
                    </xsl:for-each>
                </ul>
            </xsl:if>
            <xsl:if test="resume">
                <p>
                    <xsl:value-of select="resume"/>
                </p>
            </xsl:if>
        </div>
    </xsl:template>

    <xsl:template match="artiste">
        <li>
            <xsl:value-of select="titre"/> (<xsl:value-of select="@annee"/>)
        </li>
    </xsl:template>
</xsl:stylesheet>
```

Mettre en place une transformation XSLT permettant de générer un document HTML affichant la liste des réalisateurs.

**Solution** : Cette version utilise `apply-template`, dans ce cas de figure,
 la lecture du code est plus facile.

```xslt
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Format de sortie XHTML strict -->
    <xsl:output
            encoding="utf8"
            method="xml"
            indent="yes"
            doctype-public="-//W3C//DTD XHTML 1.0 Strict//EN"
            doctype-system="http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"
            />

    <!-- Template de départ -->
    <xsl:template match="/">
        <html>
            <head>
                <meta http-equiv="Content-Type"
                      content="text/html;charset=utf-8"/>
                <title>Films</title>
            </head>
            <body>
                <h1>Liste des films</h1>
                <xsl:apply-templates select="/films/artiste"/>
            </body>
        </html>
    </xsl:template>

    <!-- Template de rendu des artistes -->
    <xsl:template match="artiste">
        <!-- variable (pour le test et éviter les répétitions -->
        <xsl:variable name="idArtiste" select="@id"/>
        <xsl:variable name="films"
                      select="/films/film[./mes/@idref = $idArtiste]"/>
        <xsl:if test="count($films) > 0">
            <div class="artiste">
                <h2>
                    <xsl:value-of select="concat(actpnom, ' ', actnom)"/>
                    <xsl:if test="anneenaiss != ''">
                        (Né(e) en <xsl:value-of select="anneenaiss"/>)
                    </xsl:if>
                </h2>
                <ul>
                    <!-- Traitement des films (trié par année) -->
                    <xsl:apply-templates select="$films">
                        <xsl:sort select="@annee"/>
                    </xsl:apply-templates>
                </ul>
            </div>
        </xsl:if>
    </xsl:template>

    <xsl:template match="film">
        <li>
            <xsl:value-of select="titre"/> (<xsl:value-of select="@annee"/>)
        </li>
    </xsl:template>
</xsl:stylesheet>
```
- Mettre en place une transformation XSLT générant un fichier XML, contenant les films américains.

**Solution** : Elle repose sur l'utilisation de `copy-of` pour éviter d'avoir
 à recopier la structure :

```xslt
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
             xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

 <!-- Format de sortie XML -->
 <xsl:output
         encoding="utf8"
         method="xml"
         indent="yes"
         />

 <!-- Template de départ -->
 <xsl:template match="/">
     <films>
         <xsl:for-each select="//film[./pays = 'USA']">
             <xsl:copy-of select="." />
         </xsl:for-each>
         <!-- On duplique les artistes en prévision de l'étape suivante -->
         <xsl:for-each select="//artiste">
             <xsl:copy-of select="." />
         </xsl:for-each>
     </films>
 </xsl:template>

</xsl:stylesheet>
```

- Mettre en place une transformation XSLT transformant le fichier créé à la question précédente
afin de l’afficher dans un navigateur Web.

**Solution** : Pas grand chose à faire finalement, on se contente d'utilise
le fichier résultant de l'étape précédente avec le XSLT produit à l'étape 1.

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

**Solution** : On utilise ici la structure de contrôle `xsl:choose`, c'est
également une occasion d'utiliser le très élégant `xsl:attribut` :

```xslt
<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <!-- Format de sortie XML -->
    <xsl:output
            encoding="utf8"
            method="xml"
            indent="yes"
            />

    <xsl:template match="/">
        <ordre>
            <xsl:for-each select="test/nombre">
                <nb>
                    <xsl:choose>
                        <xsl:when test=". > 1000">
                            <xsl:attribute name="type">grand nombre</xsl:attribute>
                        </xsl:when>
                        <xsl:otherwise>
                            <xsl:attribute name="type">petit nombre</xsl:attribute>
                        </xsl:otherwise>
                    </xsl:choose>
                    <xsl:value-of select="." />
                </nb>
            </xsl:for-each>
        </ordre>
    </xsl:template>
</xsl:stylesheet>
```


