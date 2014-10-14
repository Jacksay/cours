<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" 
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:ecriture="http://xml.apache.org/xalan/redirect"
    extension-element-prefixes="ecriture">
  <xsl:output encoding="utf8" indent="no" method="text" />
  <xsl:template match="/">
    <xsl:for-each select="//personnage">

      <xsl:variable name="nomFichier"
        select="concat('demo-', nom,'-', prenom, '.txt')" />
      
      <ecriture:write select="$nomFichier">
        <xsl:value-of select="concat(nom,' ', prenom)" />
      </ecriture:write>
      
      <xsl:value-of select="$nomFichier" /> created !
    </xsl:for-each>
  </xsl:template>
</xsl:stylesheet>