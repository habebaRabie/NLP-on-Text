const path = require('path')
const axios = require('axios')
var https = require('follow-redirects').https;
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()

const PORT = 8082
const dotenv = require('dotenv')
dotenv.config()

const API_KEY = process.env.APIKEY
var cors = require('cors')
app.use(cors())
const Body_Parser = require('body-parser');
const json = require('./mockAPI.js');

 
var jsonParser = Body_Parser.json()
app.use(jsonParser);
var urlencodedParser = Body_Parser.urlencoded({ extended: false })
app.use(urlencodedParser);

app.use(express.static('dist'))

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})
app.post('/add-url', async (req, res) => {
    try {
        var url = req.body.url;
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
                res.send(JSON.parse(body.toString()))
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

app.listen(PORT, (error) => {
    if (error) throw new Error(error)
    console.log(`Server listening on port ${PORT}!`)
})
