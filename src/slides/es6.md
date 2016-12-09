% ECMAScript 6
% CodR
% 2016

# Introduction

# Scope Legacy

## let

Le mot-clef `let` permet de déclarer des variables **dans le scope courant** : 

```javascript
// i n'existe que dans la boucle FOR
for( let i=0; i<5; i++ ){
    console.log(i);
}
// Erreur, i n'est plus visible
console.log(i); 
```

## function

On peut déclarer déclarer arbitairement des scopes avec les accolades : 

```javascript
// Scope initial
function foo() { return 1; }
console.log(foo() === 1); // true
{
    // Nouveau scope
    function foo() { return 2; }
    console.log(foo() === 2); // true
    
    // Encore un nouveau scope
    {
        function foo() { return 3; }
        console.log(foo() === 3); // true
    }
    console.log(foo() === 2); // true
}
console.log(foo() === 1); // true
```
