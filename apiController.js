// script.js

// Utilizar la función fetch para obtener el archivo JSON
fetch("../config.json")
    .then((response) => {
        // Verificar si la respuesta es exitosa (código 200)
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo JSON");
        }
        return response.json();
    })
    .then((data) => {
        // Acceder a la configuración y actualizar el título de la página
        const configuracion = data.config || {};
        document.title = configuracion.title;

        // Actualizar el título en la etiqueta h1
        const h1Element = document.querySelector("h1.p-2");
        if (h1Element) {
            h1Element.textContent = configuracion.title;
        }
    })
    .catch((error) => {
        console.error("Error al cargar el archivo JSON:", error);
    });
