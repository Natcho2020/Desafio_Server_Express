//Crear server express
const express = require('express')
const app = express()
//Conexión al Server express con mensaje por consola 
app.listen(3000, () => {
    console.log("El servidor se inició en el puerto 3000")
})

const usuarios = {
    "usuarios": [
        "Juan",
        "Jocelyn",
        "Astrid",
        "Maria",
        "Ignacia",
        "Javier",
        "Brian"
    ]
}

// Devolvemos el JSON desde la ruta
app.get("/abracadabra/usuarios", (req, res) => {
    res.send(usuarios)
})

// Hacemos pública la carpeta assets
app.use(express.static("assets"));

// Middleware para filtrar usuario

app.use("/abracadabra/juego/:usuario", (req, res, next) => {
    const usuarioReq = req.params.usuario
    // Find para constatar la data
    if (usuarios.usuarios.find(data => data == usuarioReq)) {
        next()
    } else {
        // Respuesta de ruta definida (Imagen Who)
        res.sendFile(__dirname + "/assets/who.jpeg")
    }
})

app.get("/abracadabra/juego/:usuario", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/abracadabra/conejo/:n", (req, res) => {
    // crear número random
    const numeroAzar = Math.floor(Math.random() * 4) + 1;
    //Definir constante número elegido por usuario
    const numero = req.params.n;
    //Respuesta si los numeros coinciden
    numero == numeroAzar
        ? res.sendFile(__dirname + "/assets/conejito.jpg")
        : res.sendFile(__dirname + "/assets/voldemort.jpg")
});

//Ruta Genérica
app.get("*", (req, res) => {
    res.send("<center><h1>Esta Página no Existe! </h1></center > ");
});