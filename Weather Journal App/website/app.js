// global variables for the base URL & api key
const baseURL = 'http://api.openweathermap.org';
const apiKey = 'b07e6f609e02da47b2a5c942f584504d';

// selecting DOM elements: ones from which we'll pull out user input and others to which we'll use to update the UI
const zipInput = document.querySelector('#zip-code');
const countryInput = document.querySelector('#country-code');
const feelingsInput = document.querySelector('#feelings');
const generateBtn = document.querySelector('#generate');
const weatherDataUI = document.querySelector('.weather-data');

// asynchronous function to fetch latitude & longitude coordinates given zip & country codes from the geocoding api endpoint
async function fetchCoordinatesByZip(zipCode, countryCode) {
    const coordinatesEndpoint = `${baseURL}/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`;
    try {
        const response = await fetch(coordinatesEndpoint);
        return response.json();
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}

// asynchronous function to fetch weather data based off of latitude & longitude coordinates from the current weather data api endpoint 
async function fetchWeatherDataByCoordinates(lat, lon) {
    const weatherDataEndpoint = `${baseURL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    try {
        const response = await fetch(weatherDataEndpoint);
        return response.json();
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}

// asynchronous function that fetches coordinates by zip & country codes which upon the recipet of the coordinates data will conduct a 
// subsequent fetch of the desired weather data in lieu of these coordinates 
async function fetchWeatherData(zipCode, countryCode) {
    const { lat, lon } = await fetchCoordinatesByZip(zipCode, countryCode);
    return fetchWeatherDataByCoordinates(lat, lon);
}

// asynchronous function that sends off a get request to the server in order to retrieve the data stored in our app endpoint
async function getWeatherData() {
    const response = await fetch('/all');
    return response.json();
}

// asynchronous function that sends off a post request to the server in order to add data that has been received from the web api together with
// the user's input to our app endpoint
async function postWeatherData(url = '', data = {}) {
    const config = {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    };
    const response = await fetch(url, config);
    return response.json();
}

// this function dynamically updates the UI for the user by constructing the html string and populating it via template literals with the 
// appropriate data before it dumps it into the DOM 
function updateUI({ temperature, date, location, 'user response': feelings }) {
    const dateObj = new Date(date * 1000);
    weatherDataUI.innerHTML = `
        <h2>Weather Data</h2>
        <p>Date: ${dateObj.toDateString()}, 
            ${dateObj.getHours()}:${dateObj.getMinutes()}:${dateObj.getSeconds()} 
            ${dateObj.getHours() >= 12 ? 'pm' : 'am'} EET+02:00
        </p>
        <p>Temperature: ${temperature} &#8457;</p>
        <p>Location: ${location.zip} - ${location.country}</p>
        <p>Content: ${feelings}</p>
    `;
}

// click event handler which passes the required arguments from the user's input into a fetch call requesting data from the web api then upon 
// the successfull reciept of data will request to post it together with the remaining user's input to our app endpoint followed by a request 
// to retrieve the whole data from the app endpoint then update the UI accordingly, all of which is made possible leveraging promises chaining    
function fetchAndDisplay() {
    const zip = zipInput.value;
    const country = countryInput.value;
    const feelings = feelingsInput.value
    if (!(zip && country && feelings)) return;
    fetchWeatherData(zip, country)
        .then(({ main, dt }) => {
            postWeatherData('/all', { temperature: main.temp, date: dt, location: { zip, country }, feelings });
            return getWeatherData();
        })
        .then(updateUI);
    zipInput.value = '';
    countryInput.value = '';
    feelingsInput.value = '';
}

generateBtn.addEventListener('click', fetchAndDisplay);