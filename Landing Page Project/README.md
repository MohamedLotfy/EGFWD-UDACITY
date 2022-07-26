# Landing Page Project

## Table of Contents

* [Description](#description)
* [Starter Files](#starter-files)
* [How it works](#how-it-works)

## Description

This project is intended to create a dynamic navigation menu in the header of the webpage which is a group of links that are programmatically added to the navigation list in correspondance to the number of content sections on the page. These links are used to navigate the user seamlessly to the relevant sections when clicked.     

## Starter Files

The starter files used in this project are provided by Udacity and are comprised of:
* index.html
* styles.css
* app.js
* README.md

## How It Works
* When the user clicks on any of the links in the navigation list at the top of the webpage, the user is moved smoothly to the corresponding section
* This motion isn't CSS based rather controlled via JavaScript where a scrolling action is initiated when the user interacts with a link through a click
* Clicking a link will result in instantly applying some styles to the link by adding a class via JS as an indication that it got interacted with
* The user is also allowed to scroll through the webpage and make his way across the document to the desired section of content 
* Scrolling the page results in applying some styles to the current section that comes into view achieved also by adding a class via JS
* The scrolling interaction also applies the same styles to the link as the ones applied upon click as soon as the associated section (i.e. the one given the id we're anchoring to) is revealed in the viewport
