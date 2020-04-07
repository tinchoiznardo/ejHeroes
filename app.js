const main = require("./routes/main");


// Require de Express
const express = require("express");

// Require de FS
const fs = require("fs");

// Ejecución de Express
const app = express();



// Leyendo y parseando (en array) el contenido de heroes.json
const heroes = JSON.parse(fs.readFileSync(__dirname + '/data/heroes.json', 'utf-8'));

// Ruta Raíz / ➝ Home
app.get('/', main);

// Ruta /heroes ➝ se envía todo el array y Express lo parsea para el browser como JSON :D
app.get('/heroes', (req, res) => {
	res.send(heroes);
});

// Ruta /heroes/n ➝ se envía el nombre y profesión del héroe solicitado
app.get('/heroes/detalle/:id', (req, res) => {
	// Acá lo primero será encontrar al héroe que corresponda
    let heroe = heroes.find(x => x.id == req.params.id);
    let message = "";

    // Si se encuentra al héroe se envía el nombre y su profesión
    if(heroe) {     
        // message += ​"Hola, mi nombre es " + heroe.nombre + " y soy " + heroe.profesion;
        message = "Hola, mi nombre es " + heroe.nombre + " y soy " + heroe.profesion;
    }
    else {
        message = "No se encontro ningun heroe";
    }
    // Si NO se encuentra se envía el mensaje de no encontrado	

    res.send(message);
});

// Ruta /heroes/n/bio ➝ se envía la bio del héroe solicitado
app.get('/heroes/bio/:id/:ok?', (req, res) => {
	// Acá lo primero será encontrar al héroe que corresponda
	let heroe = heroes.find(x => x.id == req.params.id);
    let message1 = "";

    // Si NO se encuentra al héroe se envía un mensaje
    if(!heroe) {
        message1 = "No encontramos un héroe para mostrarte su biografía";
    }
    // Si se encuentra al héroe:
    else {
        // Si nó vino el parámetro se envía el mensaje de error
        if(!req.params.ok)
            message1 = heroe.nombre + " <br> ​Lamento que no desees saber más de mi :(";
        else
            message1 = heroe.nombre + " <br> ​" + heroe.resenia;
        // Se pregunta si vino el parámetro Y el valor esperado y se envía la información
    }

    res.send(message1);
});

// Ruta Créditos
app.get('/creditos', (req, res) => {
    res.send("Muchas gracias, esta estubo mas facil que la anterior :) <br><br> Equipo : <br> Martin Iznardo (tincho)<br>Bruno Aranda<br>" + 
            "Matias Rodriguez<br>Ysmael Alcala")
})

// Ruta... ¿Pára qué sirve esto?
app.get('*', (req, res) => {
	res.status(404).send('404 not found. <br> ¡Houston, poseemos problemas!');
});

module.exports = app;