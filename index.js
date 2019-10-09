const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (request, response) => {
    response.sendFile(__dirname + '/public/home.html');
});

app.post('/api/people', (request, response) => {
    console.log(request.body);
    response.send({
        message: 'ok',
    });
});

app.listen(3000, () => {
    console.log('listening');
});