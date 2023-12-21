let high = prompt("Introduzca el alto del tablero");
let width = prompt("Introduzca el ancho del tablero");

//--------Size of screen game-------------
if (width < 10 || width > 100) {
    alert("Ingrese un ancho entre 10 y 100");
} else if (high < 10 || high > 100) {
    alert("Ingrese un alto entre 10 y 100");
} else {
    alert(`Pantalla de juego: Alto: ${high}, ancho: ${width}`);
    recorrerAncho(width);
    recorrerAlto(high);
}

//Print the width
function recorrerAncho(width) {
    console.log("Recorrer ancho");
    for (let i = 1; i < width; i++) {
        console.log(i);
    }
}

//Print the high
function recorrerAlto(high) {
    console.log("Recorrer alto");
    for (let i = 1; i < high; i++) {
        console.log(i);
    }
}
