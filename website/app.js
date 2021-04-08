/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

// API key from OpenWeatherMap.org
let apiKey = "fd00ec38e6554fb6612b7bea9baad402";

// Placeholderso for the printed data
let dateData = document.getElementById("date");
let tempData = document.getElementById("temp");
let feelingsData = document.getElementById("content");

// Getting feedback from the button
const generate = document.getElementById("generate");
generate.addEventListener('click', generateURL);


// Creating asynchronous function `generateURL` that excutes on clicking the button
async function generateURL() {
    // Reading `zip code` and `feelings` from the two text areas
    const zipCode = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    // Checking if any error exists and print the error in the console if found
    try {
        // Checking if the user entered a zip code or not
        if (zipCode) {
            // Creating a complete url
            const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=metric`;
            
            //Calling other functions and chainig them using .then()
            getData(url)
                .then(function(data = {})  {
                    postData('/addData', 
                    {
                        date: newDate,
                        temp: data.main.temp,
                        feelings: feelings
                    })
                    .then(updateUI());
                });
        }
        else {
            // alerting user to enter a zip code
            alert("Enter a zip code");
        }
    } catch (error) {
        // if an error is caught it will be printed in console
        console.log(`error: ${error}`)
    }
}

// Creating asynchronous function `getData` that gets the data from api
async function getData(url) {
    // Checking for errors
    try {
        // Getting data from api and returning it
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        // Printing errors if existed
        console.log(`error: ${error}`)
    }
}

// Creating asynchronous function `postData` to post data to the server
async function postData (url = '', data = {}) {
    // Configuring the post request to deal with json data and to work with `index.html`
    const res = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data)
    });

    try {
        // returning back the new data
        const data= await res.json();
        return data;
    } catch (error) {
        // Printing errors
        console.log(`error: ${error}`);
    }
}

// Creating asynchronous function `updateUI` to update the ui with new data
async function updateUI() {

    // getting all data
    const req = await fetch('/all');

    // Checking for errors
    try {
        // getting the data from server
        const projectData = await req.json();

        //Updating the placeholders of the data
        dateData.innerHTML = `Date: ${projectData.date}`;
        tempData.innerHTML = `Temperature: ${projectData.temp}`;
        feelingsData.innerHTML = `I feel: ${projectData.feelings}`;
        
    } catch (error) {
        // prenting the error
        console.log(`error: ${error}`);
    }
}
