const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

var people = [];

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/home.html');
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

app.listen(3000, () => {
    console.log('listening');
});