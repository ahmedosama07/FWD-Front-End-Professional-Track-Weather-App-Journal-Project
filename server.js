// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Port number
const port = 8888;

// Require Express to run server and routes
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
// Start up an instance of app
const app = express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
app.listen(port, running())

// Callback function
function running() {
    console.log(`server running on localhost: ${port}`)
}

// Get request
app.get('/all', function(req, res) {
    res.send(projectData)
});

//Post request
app.post('/addData', function(req, res) {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        feelings: req.body.feelings
    };
    console.log(projectData);
    res.send(projectData)
});