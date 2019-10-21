const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const url = 'mongodb://localhost:27017';
const dbName = 'store';
const client = new MongoClient(url);

// conectar el cliente de mongo
client.connect(function(err) {
    // asegurarnos de que no existe un error
    assert.equal(null, err);

    console.log('conexión');

    // conectamos el cliente a la base de datos que necesitamos
    const db = client.db(dbName);

    /*const products = db.collection('products');

    const obj = {
        name: 'Camiseta',
        price: 49000,
        colors: ['white', 'blue'],
        description: 'lorem ipsum',
        stock: 10,
    };

    products.insertOne(obj);*/

    //client.close();

    // todas las funciones que interactuen con la base de datos van aquí
    app.get('/', (request, response) => {
        response.sendFile(__dirname + '/public/home.html');

        // seleccionamos la colección que necesitamos
        const products = db.collection('products');

        // buscamos todos los productos
        products.find({})
            // transformamos el cursor a un arreglo
            .toArray((err, result) => {
                // asegurarnos de que no hay error
                assert.equal(null, err);

                //
                console.log(result);
            });

    });
});

var people = [];


app.get('/api/people', (request, response) => {
    response.send(people);
})

app.post('/api/people', (request, response) => {
    console.log(request.body);
    people.push(request.body);
    response.send({
        message: 'ok',
    });
});

app.listen(3000, () => {
    console.log('listening');
});