let canvas;
let ctx;
//Velocidad de la ejecucion
let fps = 15;

let height;
let width;

//let height = parseInt(prompt("Introduzca el height del tablero entre 1 y 5")); //pixels height
//let width = parseInt(prompt("Introduzca el width del tablero 1 y 5")); //pixels width

let tileX, tileY;

//letiables relacionadas con el tablero de juego
let tablero;

let columnas;
let filas;

//Color blanco
let blanco = "#FFFFFF";
//Color negro
let negro = "#000000";

//--------------------INPUTS---------------------
let heightInput = document.querySelector("#altoInput");
let widthInput = document.querySelector("#anchoInput");

let mostrarArbolRadio, noMostrarArbolRadio, jugarButton;

document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencias a los elementos del DOM

    mostrarArbolRadio = document.querySelector("#flexRadioDefault1");
    noMostrarArbolRadio = document.querySelector("#flexRadioDefault2");
    jugarButton = document.querySelector("#jugarButton");

    // Evento clic en el botón "Jugar"
    jugarButton.addEventListener("click", function () {
        // Obtener y convertir los valores de los inputs y radios a enteros
        let height = parseInt(heightInput.value);
        let width = parseInt(widthInput.value);
        let mostrarArbol = mostrarArbolRadio.checked;

        // Verificar si la conversión fue exitosa (si los valores ingresados son números)
        if (isNaN(height) || isNaN(width)) {
            alert(
                "Por favor, ingresa valores numéricos válidos para el height y el width del tablero."
            );
        } else {
            // Puedes hacer lo que quieras con los valores enteros, por ejemplo, imprimirlos en la consola
            console.log("Alto del tablero:", height);
            console.log("width del tablero:", width);
            console.log("Mostrar arbol binario:", mostrarArbol);
        }
        inicializa();
    });
});

// -----------------------RULES GAME---------
/*
- Nace: Si una célula muerta tiene exactamente 3 células vecinas vivas "nace" (es decir, al turno siguiente estará viva).
- Muere: una célula viva puede morir por uno de 2 casos:
--- Sobrepoblación: si tiene más de tres vecinos alrededor.
--- Aislamiento: si tiene solo un vecino alrededor o ninguno.
- Vive: una célula se mantiene viva si tiene 2 o 3 vecinos a su alrededor.
*/

// -------------------------GAME-------------------

function creaArray2D(f, c) {
    let obj = new Array(f);
    for (y = 0; y < f; y++) {
        obj[y] = new Array(c);
    }

    return obj;
}

//Objeto Celula
let Celula = function (x, y, estado) {
    this.x = x;
    this.y = y;
    /*
  ESTADOS: ----------------------------
  vivo = 1
  muerto = 0
  */
    this.estado = estado;
    this.estadoProx = this.estado; //Asignamos el estado que tendrá en el siguiente ciclo

    this.vecinos = []; //Guardamos el listado de los vecinos

    //Metodo que añade los vecinos del objeto actual
    this.addVecinos = function () {
        let xVecino;
        let yVecino;

        for (i = -1; i < 2; i++) {
            for (j = -1; j < 2; j++) {
                xVecino = (this.x + j + columnas) % columnas;
                yVecino = (this.y + i + filas) % filas;

                //Descartamos la celula actual (Una celula no puede ser su propia vecina)
                if (i != 0 || j != 0) {
                    this.vecinos.push(tablero[yVecino][xVecino]);
                }
            }
        }
    };

    this.dibuja = function () {
        let color;

        if (this.estado == 1) {
            color = blanco;
        } else {
            color = negro;
        }

        ctx.fillStyle = color;
        ctx.fillRect(this.x * tileX, this.y * tileY, tileX, tileY);
    };

    //----------------Aplicamos las leyes de Conway (Reglas del juego)----------------
    this.nuevoCiclo = function () {
        let suma = 0;

        //Calculamos la cantidad de vecinos vivos
        for (i = 0; i < this.vecinos.length; i++) {
            suma += this.vecinos[i].estado;
        }

        //Valor por defecto lo dejamos igual
        this.estadoProx = this.estado;

        //--------------MUERTE: tiene menos de 2 o más de 3-------------
        if (suma < 2 || suma > 3) {
            this.estadoProx = 0;
        }

        //---------------VIDA/REPRODUCCIÓN: tiene exactamente 3 vecinos------------
        if (suma == 3) {
            this.estadoProx = 1;
        }
    };

    this.mutacion = function () {
        this.estado = this.estadoProx;
    };
};

function inicializaTablero(obj) {
    let estado;

    for (y = 0; y < filas; y++) {
        for (x = 0; x < columnas; x++) {
            estado = Math.floor(Math.random() * 2);
            obj[y][x] = new Celula(x, y, estado);
        }
    }

    for (y = 0; y < filas; y++) {
        for (x = 0; x < columnas; x++) {
            obj[y][x].addVecinos();
        }
    }
}

function borraCanvas() {
    canvas.width = canvas.width;
    canvas.height = canvas.height;
}

function inicializa() {
    //Asociamos el canvas
    canvas = document.getElementById("tablero");
    ctx = canvas.getContext("2d");

    //Ajustamos el tamaño del canvas
    canvas.width = width;
    canvas.height = height;
    console.log("width del tablero en pixeles " + canvas.width);
    console.log("Alto del tablero en pixeles " + canvas.height);

    //calculamos tamaño tiles
    //Multiplicamos por 10 para que el tamaño de los pixeles sea mas grande
    tileX = Math.floor((width / filas) * 10);
    tileY = Math.floor((height / columnas) * 10);

    //creamos el tablero
    console.log(columnas);
    tablero = creaArray2D(filas, columnas);
    //Lo inicializamos
    inicializaTablero(tablero);

    //Ejecutamos el bucle main
    setInterval(function () {
        main();
    }, 1000 / fps);

    console.log("Se inicializo");
}

function dibujaTablero(obj) {
    //Dibujamos las Celulas
    for (y = 0; y < filas; y++) {
        for (x = 0; x < columnas; x++) {
            obj[y][x].dibuja();
        }
    }

    //Calculamos el siguiente ciclo
    for (y = 0; y < filas; y++) {
        for (x = 0; x < columnas; x++) {
            obj[y][x].nuevoCiclo();
        }
    }

    //Se aplica la mutacion
    for (y = 0; y < filas; y++) {
        for (x = 0; x < columnas; x++) {
            obj[y][x].mutacion();
        }
    }
}

function main() {
    borraCanvas();
    dibujaTablero(tablero);
}

//Se debe re poner la funcion de inicializar en el boton de jugar para que se inicie el juego
//inicializa();
