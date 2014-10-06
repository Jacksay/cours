<?xml version="1.0" encoding="utf-8" ?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
		version="1.0">
	<xsl:output method="html" indent="yes"/>

	<xsl:template match="/">
		<h1>Personnages</h1>
		<xsl:for-each select="personnages/personnage">
			<xsl:apply-templates select="." />
		</xsl:for-each>
	</xsl:template>

	<xsl:template match="personnage">
		<article class="clan-@maison">
			<h2>
				<xsl:value-of select="concat(nom, ' ', prenom)" />
			</h2>
		</article>
	</xsl:template>
</xsl:stylesheet>