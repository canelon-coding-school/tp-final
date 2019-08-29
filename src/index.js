const express = require('express');
const bodyParser = require('body-parser');
const USerRepository = require('./userRepository');

const app = express();

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', function (request, response) {
    response.set('Access-Control-Allow-Origin', '*');
    const users = [];

    USerRepository.getAll()
        .then((elpaisas) => {
            elpaisas.map(item => {
                users.push(item.toJSON())
            });

            response.status(200).send(users);
        });
});

app.post('/save', urlencodedParser, function (request, response) {
    let code = 200;
    let secureResponse = 'OK'

    const { name, mail, pass } = request.body;

    USerRepository.add(name, mail, pass);

    response.set('Access-Control-Allow-Origin', '*');
    return response.status(code).send(secureResponse);
});

app.listen(9900, () => console.log('Server is running...'));
