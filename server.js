const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Client = require('node-rest-client').Client;//import it here
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');

const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

// the database
const questions = [];


// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

app.use(cors());

// log HTTP requests
app.use(morgan('combined'));


const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://<YOUR_AUTH0_DOMAIN>/.well-known/jwks.json`
    }),

    // Validate the audience and the issuer.
    audience: '<YOUR_AUTH0_CLIENT_ID>',
    issuer: `https://<YOUR_AUTH0_DOMAIN>/`,
    algorithms: ['RS256']
});


// insert a new question
app.post('/', checkJwt, (req, res) => {
    const {title, description} = req.body;
    const newQuestion = {
        id: questions.length + 1,
        title,
        description,
        answers: [],
        author: req.user.name,
    };
    questions.push(newQuestion);
    res.status(200).send();
});


app.get('/topCategory', (req, res) => {

    var client = new Client();

// direct way
    client.get("http://149.129.128.3:3737/search/resources/store/1/categoryview/@top?depthAndLimit=-1,-1,-1,-1", (data, response) => {
        res.send({express: data});
    });
});


app.get('/category/:id', (req, res) => {
    var id = req.params.id;
    console.log(req.params.id)
    var client = new Client();

// direct way
    client.get("http://149.129.128.3:3737/search/resources/store/1/productview/byCategory/" + id, (data, response) => {
        res.send({express: data});
    });
});


app.get('/product/:id', (req, res) => {
    var id = req.params.id;
    console.log(req.params.id)
    var client = new Client();

// direct way
    client.get("http://149.129.128.3:3737/search/resources/store/1/productview/byId/" + id, (data, response) => {
        res.send({express: data});
    });
});


const port = 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));

