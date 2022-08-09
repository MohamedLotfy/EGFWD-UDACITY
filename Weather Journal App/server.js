// requiring project framework -express- and dependancies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// app endpoint - an object data structure 
const weatherData = {};

// creating an app instance
const app = express();

// configuring our app to use the required middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// pointing our app to serve the browser-related files from the website folder
app.use(express.static('website'));

// setting up a home route to render the 
app.get('/', function (req, res) {
    res.render('index.html');
});

// setting up a get route to handle get requests to the /all url path to respond with the data stored in our app endpoint 
app.get('/all', function (req, res) {
    res.send(weatherData);
});

// setting up a post route to handle post requests to the same url /all which creates a new data entry into our app endpoint
app.post('/all', function (req, res) {
    const { temperature, date, location, feelings } = req.body;
    weatherData.temperature = temperature;
    weatherData.date = date;
    weatherData.location = location;
    weatherData['user response'] = feelings;
    console.log(weatherData);
});

// spin a server on port 3000 
app.listen(3000, () => {
    console.log('SERVER UP & RUNNING!');
});