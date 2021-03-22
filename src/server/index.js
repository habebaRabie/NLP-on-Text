// TODO: Configure the environment variables
const path = require('path')
const axios = require('axios')
var https = require('follow-redirects').https;
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()

const PORT = 8082
const dotenv = require('dotenv')
dotenv.config()
// TODO add Configuration to be able to use env variables

const API_KEY = process.env.APIKEY
// TODO: Create an instance for the server
var cors = require('cors')
app.use(cors())
// TODO: Configure cors to avoid cors-origin issue
const Body_Parser = require('body-parser');
const json = require('./mockAPI.js');

 
// create application/json parser
var jsonParser = Body_Parser.json()
app.use(jsonParser);
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = Body_Parser.urlencoded({ extended: false })
app.use(urlencodedParser);
// TODO: Configure express to use body-parser as middle-ware.
// TODO: Configure express static directory.
// app.use(express.static('src/client'))
// app.use(express.static(__dirname + 'src/client'));
app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})
// INFO: a route that handling post request for new URL that coming from the frontend
app.post('/add-url', async (req, res) => {
    try {
        var url = req.body.checkingURL;
        var options = {
            'method': 'POST',
            'hostname': 'api.meaningcloud.com',
            'path': `/sentiment-2.1?key=${API_KEY}&lang=en&url=${url}`,
            'headers': {
            },
            'maxRedirects': 20
          };
        
          var request = https.request(options, function (result) {
            var chunks = [];
        
            result.on("data", function (chunk) {
              chunks.push(chunk);
            });
        
            result.on("end", function (chunk) {
              var body = Buffer.concat(chunks);
              console.log(body.toString());
                res.send({
                    data : JSON.parse(body.toString())
                })
            });
        
            result.on("error", function (error) {
              console.error(error);
            });
          });
        
          request.end();
        
        
    } catch (error) {
        console.log(error.message)
    }
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})

// TODO: export app to use it in the unit testing //////////////////done
//export {app};

/* TODO:
    1. GET the url from the request body ///////////////done
    2. Build the URL it should be something like `${BASE_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${req.body.url}&lang=en`
    3. Fetch Data from API
    4. Send it to the client
    5. REMOVE THIS TODO AFTER DOING IT 😎😎
    server sends only specified data to the client with below codes
     const sample = {
       text: '',
       score_tag : '',
       agreement : '',
       subjectivity : '',
       confidence : '',
       irony : ''
     }
  */