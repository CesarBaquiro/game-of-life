// let high = prompt("Introduzca el alto del tablero");
// let width = prompt("Introduzca el ancho del tablero");

//--------Size of screen game-------------
if (width < 10 || width > 100) {
    alert("Ingrese un ancho entre 10 y 100");
} else if (high < 10 || high > 100) {
    alert("Ingrese un alto entre 10 y 100");
} else {
    alert(`Pantalla de juego: Alto: ${high}, ancho: ${width}`);
}

//Print the width
console.log("Recorrer ancho");
for (let i = 1; i < width; i++) {
    console.log(i);
}

//Print the high
console.log("Recorrer alto");
for (let i = 1; i < high; i++) {
    console.log(i);
}
