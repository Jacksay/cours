% Responsive Design
% Technologies du web
% Stéphane Bouvry, 2014

# Objectif

- Utilisation de CSS pour la mise en page

# Grille fluide

Dans cette partie, nous allons créer pas-à-pas notre propre grille fluide.

### Préparation

Créez 2 fichiers : 

- grid.html
- grid.css

La grille que nous allons réaliser permettra de diviser l'espace d'affichage en 12 colonnes. Vous verrez que la somme des colonnes sera toujours égale à 12.

Ajoutez ce code au fichier CSS, il permettra de visualiser les différentes colonne de la grille en mettant une couleur en arrière-plan.

```css
.col12 { background-color: rgba(124,176,69,0.08); }
.col11 { background-color: rgba(124,176,69,0.16); }
.col10 { background-color: rgba(124,176,69,0.24); }
.col9 { background-color: rgba(124,176,69,0.32); }
.col8 { background-color: rgba(124,176,69,0.40); }
.col7 { background-color: rgba(124,176,69,0.48); }
.col6 { background-color: rgba(124,176,69,0.56); }
.col5 { background-color: rgba(124,176,69,0.64); }
.col4 { background-color: rgba(124,176,69,0.72); }
.col3 { background-color: rgba(124,176,69,0.80); }
.col2 { background-color: rgba(124,176,69,0.88); }
.col1 { background-color: rgba(124,176,69,1); }
```

Vous pourrez le supprimer une fois la grille prête.

### La grille

Ajoutez maintenant ce code au HTML : 

```html
<div class="row">
    <div class="col6">col 6</div>    
    <div class="col6">col 6</div>
</div>
```

Puis modifier ensuite le CSS pour obtenir un affichage en colonne en utilisant la technique des `float` comme nous l'avons vu dans les ateliers précédents. Vous ajusterez la largeur des colonnes **en pourcent**.

Modifiez ensuite le fichier HTML en ajoutant ce code, et complétez le CSS : 

```html
<div class="row">
    <div class="col6">col 6</div>    
    <div class="col3">col 3</div>
    <div class="col3">col 3</div>
</div>
```

puis ajoutez : 

```html
<div class="row">
    <div class="col4">col 4</div>    
    <div class="col4">col 4</div>
    <div class="col4">col 4</div>
</div>
```

Voici enfin le code HTML complet à faire fonctionner : 

```html
<div class="row">
    <div class="col12">col 12</div>  
</div>
<div>  
    <div class="col11">col 11</div>
    <div class="col1">col 1</div>
</div>
<div>  
    <div class="col10">col 10</div>
    <div class="col2">col 2</div>
</div>
<div>  
    <div class="col9">col 9</div>
    <div class="col3">col 3</div>
</div>
<div>  
    <div class="col8">col 8</div>
    <div class="col4">col 4</div>
</div>
<div>  
    <div class="col7">col 7</div>
    <div class="col5">col 5</div>
</div>
<div class="row">
    <div class="col6">col 6</div>    
    <div class="col6">col 6</div>
</div>
```



