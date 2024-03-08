const express = require("express");
const path = require("path");

const app = express();
const port = 8000;

// Servir archivos estáticos desde el directorio actual
app.use(express.static(__dirname));

// Ruta principal que sirve tu archivo HTML
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "game.html"));
});

// Iniciar el servidor en el puerto especificado
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
