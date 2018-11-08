const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Client = require('node-rest-client').Client;//import it here
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');

// require('https').globalAgent.options.ca = require('ssl-root-cas/latest').create();


// enhance your app security with Helmet
app.use(helmet());

// use bodyParser to parse application/json content-type
app.use(bodyParser.json());

// log HTTP requests
app.use(morgan('combined'));

app.use(cors());


// var selfsigned = require('selfsigned');
// var attrs = [{ name: 'commonName', value: 'localhost:3030' }];
// var pems = selfsigned.generate(attrs, { days: 365 });
// console.log(pems)

// selfsigned.generate(attrs, { days: 365 }, function (err, pems) {
//     console.log(pems)
//   });

//   var pems = selfsigned.generate(null, { clientCertificate: true });
//   console.log(pems)

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

app.post('/guestidentity',(req, res) => {
    console.log("Hello from Server") 
    var client = new Client();
   
    // direct way
    client.post("https://149.129.128.3:5443/wcs/resources/store/1/guestidentity", (data, response) => {
        res.send({ express: data });
    });
});



app.post('/cart',(req, res) => {
    
   var client = new Client();
   var args = {
       headers:req.body.headers,
       data:req.body.data
   };

    // direct way
    client.post("https://149.129.128.3:5443/wcs/resources/store/1/cart",args,(data, response) => {
        res.send({ express: data });
    });

});


app.get('/viewCart',(req, res) => {
    
    var client = new Client();
    var args = {
        headers:req.body.headers
    };
 
     // direct way
     client.get("https://149.129.128.3:5443/wcs/resources/store/1/cart/@self ",args,(data, response) => {
         res.send({ express: data });
         console.log(data)
     });
 
 });
 





app.get('/topCategory', (req, res) => {

    var client = new Client();

    // direct way
    client.get("http://149.129.128.3:3737/search/resources/store/1/categoryview/@top?depthAndLimit=-1,-1,-1,-1", (data, response) => {
        res.send({ express: data });
    });
});


app.get('/category/:id', (req, res) => {
    var id = req.params.id;
    console.log(req.params.id)
    var client = new Client();

    // direct way
    client.get("http://149.129.128.3:3737/search/resources/store/1/productview/byCategory/" + id, (data, response) => {
        res.send({ express: data });
    });
});


app.get('/product/:id', (req, res) => {
    var id = req.params.id;
    console.log(req.params.id)
    var client = new Client();

    // direct way
    client.get("http://149.129.128.3:3737/search/resources/store/1/productview/byId/" + id, (data, response) => {
        res.send({ express: data });
    });
});


const port = 3030;
app.listen(port, () => console.log(`Server running on port ${port}`));

