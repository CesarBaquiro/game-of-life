document.addEventListener("DOMContentLoaded", function () {
    // Obtener referencia al elemento del DOM
    let nameInput = document.getElementById("nameInput");
    let playerNameSpan = document.getElementById("playerNameSpan");

    // Función para actualizar el nombre en el localStorage, el input y el span
    function updatePlayerName() {
        // Obtener el valor del input
        let playerName = nameInput.value;

        // Verificar si el nombre no está vacío antes de guardarlo
        if (playerName.trim() !== "") {
            // Guardar el nombre en el localStorage
            localStorage.setItem("playerName", playerName);

            // Actualizar el contenido del span con el nombre del jugador
            if (playerNameSpan) {
                playerNameSpan.textContent = playerName;
            } else {
                //console.error("Elemento playerNameSpan no encontrado.");
            }
        }
    }

    // Obtener el nombre almacenado en el localStorage al cargar la página
    let storedName = localStorage.getItem("playerName");

    // Verificar si hay un nombre almacenado y establecerlo en el input y el span
    if (storedName !== null) {
        nameInput.value = storedName;
        updatePlayerName(); // Llamar a la función para actualizar el span
    }

    // Evento input en el input para actualizar el nombre en el localStorage y el span
    nameInput.addEventListener("input", updatePlayerName);
});

document.addEventListener("DOMContentLoaded", function () {
    // Obtener el nombre almacenado en el localStorage
    let playerName = localStorage.getItem("playerName");

    // Verificar si el nombre del jugador está almacenado
    if (playerName) {
        // Obtener el elemento span por su ID
        let playerNameSpan = document.getElementById("playerNameSpan");

        // Verificar si se encontró el elemento span
        if (playerNameSpan) {
            // Establecer el contenido del span con el nombre del jugador
            playerNameSpan.textContent = playerName;
        } else {
            //console.error("Elemento playerNameSpan no encontrado.");
        }
    } else {
        //console.error("Nombre del jugador no encontrado en el localStorage.");
    }
});
