const assert = require('assert');

function createRoutes (app, db) {
    
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
}

module.exports = createRoutes;