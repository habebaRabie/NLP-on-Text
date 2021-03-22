// TODO: Configure the environment variables
const path = require('path')
const axios = require('axios')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const app = express()

const PORT = 8082
const dotenv = require('dotenv')
dotenv.config()
// TODO add Configuration to be able to use env variables

const BASE_API_URL = 'https://api.meaningcloud.com/sentiment-2.1'
const API_KEY = process.env.API_KEY
// TODO: Create an instance for the server
var cors = require('cors')
app.use(cors())
// TODO: Configure cors to avoid cors-origin issue
const Body_Parser = require('body-parser')

 
// create application/json parser
var jsonParser = Body_Parser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = Body_Parser.urlencoded({ extended: false })
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
        const API_RESPONSE = await axios.get(
            `${BASE_API_URL}?key=${API_KEY}&url=${url}&lang=en`
        )
        const data = { 
            text: sentence_list[0].text,
            score_tag : '',
            agreement : '',
            subjectivity : '',
            confidence : '',
            irony : ''
        } = API_RESPONSE.data
        res.send({
            text,
            score_tag,
            agreement,
            subjectivity,
            confidence,
            irony
        })
        
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