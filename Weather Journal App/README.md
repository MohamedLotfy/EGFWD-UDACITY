# Weather Journal App Project

## Table of Contents

* [Description](#description)
* [Starter Files](#starter-files)
* [How it works](#how-it-works)

## Description

This project is intended to dynamically update the UI displayed to the user with the appropriate weather data given the information entered by the user with regard to a location represented by a zip code and a country code.         

## Starter Files

The starter folders/files used in this project are comprised of:
* website
  * index.html
  * styles.css
  * app.js
* server.js
* package.json
* README.md

## How It Works
* When the user clicks on the generate button, a network request is sent off to the designated OpenWeatherMap web api endpoints to fetch weather data
* When the weather data that has been requested is successfully received, it will be sent together with some user response via a post request to the server through the '/all' url path
* On the server side there's a post route set up that handles the client side post request and stores the sent data accordingly in the app endpoint
* The app's UI is updated given the data sent by the get route set up on the server side that's stored in the app endpoint in response to the client side get request to the '/all' url path
