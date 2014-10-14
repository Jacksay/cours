<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
		version="1.0">
	<xsl:output method="html" indent="yes"/>

<xsl:template match="/">
	<h1>Personnages</h1>
	<xsl:apply-templates select="personnages/personnage" />
</xsl:template>

<xsl:template match="personnage">
	<article class="{@maison}">
		<header>
			<h2>
				<xsl:apply-templates select="." mode="plain" />
			</h2>
			<xsl:apply-templates select="." mode="vcard" />
		</header>
		
	</article>
</xsl:template>

<xsl:template match="personnage" mode="plain">
	<xsl:value-of select="concat(prenom, ' ', nom)" />
</xsl:template>

<xsl:template match="personnage" mode="vcard">
	<div class="vcard">
     	<span class="fn">
     		<xsl:value-of select="concat(prenom, ' ', nom)" />
     	</span>
     	<span class="n">
			<span class="honorific-prefix">
				<xsl:value-of select="@titre" />
			</span>
			<span class="given-name">
				<xsl:value-of select="prenom" />
			</span>
			<span class="family-name">
				<xsl:value-of select="nom" />
			</span>
		</span>
	 </div>
</xsl:template>

</xsl:stylesheet>