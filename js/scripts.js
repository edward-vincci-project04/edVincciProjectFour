/**
 *  Destination places by Weather
 * 
 * Landing page welcoming the user and explaining what the app does.
 * A button which will allow the user to proceed. Said button will have a listener that will hide or scroll the welcome screen to the main content.
 * 
 * Main content of page will have a 'box' with pictures of weather preferences (Cold, warm, hot).
 * The imgs will be selectors or maybe using a click listener give the action an animation like a button to show it being selected.
 * 
 * The selection will populate travel destinations from a list we created based on research (of best destinations) which we'll feed into the  ajax function from which we will pull data out based on the temperature range the user selected. Those 
 * destinations will be put into a list on the page.  * 
 * 
 * 
  Initial travel list to work with (subject to change and/or grow):
  Bali, Indonesia
  Kerry, Ireland
  Male, The Maldives
  Waikato, New Zealand
  McMurdo Station, Antarctica
  Bridgetown, Barbados
  Providencia, Colombia
  Reykjavík, Iceland
  Kyoto, Japan
  Tromsø, Norway
 * 
 * Stretch goals:
 * 
 * From the list the user can select a destination which will pull it up on the map.
 * 5 or 7 day forecast of location selected
 * top restaurants in the location selected
 * Recommended hotels in the location selected
 * selector for weather condition to further refine search
 * when user selects city, a blurb about it will appear giving a small snippet of it.
 * 
 */

// Namespace init
const vacayApp = {};

// variables
vacayApp.hereApiKey = `Cl4BqeFBq-GNBKFZC1Nz9Ux12AiOXdtj6r2EG-CWSdY`;
vacayApp.hereURL = `https:weather.ls.hereapi.com/weather/1.0/report.json`
vacayApp.destinations = ["Bali", "Kerry", "Male", "Waikato", "Mcmurdo Station", "Bridgetown", "Providencia", "Reykjavik", "Kyoto", "Tromso"];

let userSelect;

// user select portion
$(".imgSelection").on("click", function () { //placeholder code
  // const selection = "mild"; // for testing purposes
  const selection = $this.val(); // .val may need to be changed.

  return userSelect = selection; // pushing value of user selection to empty variable to use later.

});

//on button click confirm, run entire program

$(".confirm").on("click", function () { 
  vacayApp.destinationsCycle();

});




// loop through destinations individually to feed into ajax
vacayApp.destinationsCycle = () => {
  vacayApp.destinations.forEach((location) => {
    // console.log(location);
    vacayApp.getDestWeather(location);
  });
};

// ajax call to run our cities through to get the array data from.
vacayApp.getDestWeather = (input) => {
  $.ajax({
    url: vacayApp.hereURL,
    method: "GET",
    dataType: "json",
    data: {
      apiKey: vacayApp.hereApiKey,
      product: "observation",
      name: input
    }
  }).then((result) => {
    // console.log(result);
    const vacayArray = result.observations.location[0];
    // console.log(vacayArray); 
    vacayApp.displayVacay(vacayArray, userSelect);
  });
};

// display the vacations onto the page 
vacayApp.displayVacay = (vacay, userSelection) => { //this needs to take data from two different places
    // console.log(test);
    // console.log("vacations", vacay);
    // display city
    const city = vacay.city;
    // console.log(city);
    // disp country
    const country = vacay.country;
    // console.log(country);
    // disp weather
    const temp = Math.floor(vacay.observation[0].highTemperature);
    // console.log(temp);

    // Weather api has a weather description which can be helpful for our needs
    const tempDesc = vacay.observation[0].temperatureDesc
    // console.log(tempDesc);

    // printing a nice statement for testing.
    console.log(`The weather in ${city}, ${country} is ${tempDesc}. The current high temperature is ${temp}.`)


     // if statements to populate list to user
    // below is testing. needs updating on html completion
    if (userSelection === "mild" && temp < 25) {
      console.log("it's warm");
    } else {
      console.log("this broke");
    }    

    // need to append the above to the html when that portion has been completed
}




// -------------------
// init
// -------------------
vacayApp.init = () => {
  vacayApp.destinationsCycle()
}
// -------------------
// doc ready
// -------------------
$(()=> {
  // vacayApp.destinationsCycle();  
})