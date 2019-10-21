const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const createRoutes = require('./routes.js');

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

    createRoutes(app, db);

    app.listen(3000, () => {
        console.log('listening');
    });
});