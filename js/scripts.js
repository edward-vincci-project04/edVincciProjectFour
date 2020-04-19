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

// constiables
vacayApp.hereApiKey = `Cl4BqeFBq-GNBKFZC1Nz9Ux12AiOXdtj6r2EG-CWSdY`;
vacayApp.hereURL = `https:weather.ls.hereapi.com/weather/1.0/report.json`;
vacayApp.hereMapURL = `https://image.maps.ls.hereapi.com/mia/1.6/mapview`;
vacayApp.zomatoApiKey = `b655786c25f1fdb7949ffd2d5bb49eb6`;
vacayApp.zomatoCityURL =`https://developers.zomato.com/api/v2.1/cities`
vacayApp.zomatoEstablishmentURL = `https://developers.zomato.com/api/v2.1/establishments`
vacayApp.userSelect;
vacayApp.destinations = [
    ["Bali", "You’ll find beaches, volcanoes, Komodo dragons and jungles sheltering elephants, orangutans and tigers. Basically, it’s paradise. It’s likely you’ve seen an image of Bali on social media at least once in the past seven days, as it’s such a popular bucket list destination for 2019. -forbes.com"], 
    ["Kerry", "All the way west in Ireland is one of the country’s most scenic counties. Kerry’s mountains, lakes and coasts are postcard-perfect, and that’s before you add in Killarney National Park. The unique small towns such as Dingle add to its charm. -forbes.com"], 
    ["Male", "This tropical nation in the Indian Ocean is made up of more than 1,000 coral islands. It’s home to some of the world’s most luxurious hotel resorts, with white sandy beaches, underwater villas and restaurants and bright blue waters. -forbes.com"],
    ["Waikato", "Waikato, a region in New Zealand’s North Island, is home to massive underground caves, lush rainforest and the buzzy city of Hamilton. But the area’s main attraction? A Middle-earth adventure on the film set of Lord of the Rings. Hobbiton Movie Set still has the original Hobbit holes from the making of the films. -forbes.com"], 
    ["Mcmurdo Station", "The McMurdo Station is a United States Antarctic research station on the south tip of Ross Island, which is in the New Zealand–claimed Ross Dependency on the shore of McMurdo Sound in Antarctica. It is operated by the United States through the United States Antarctic Program, a branch of the National Science Foundation. -wikipedia.org"],
    ["Bridgetown", "Bridgetown, the capital of Barbados, is a port city on the island’s southwest coast. It's known for its British colonial architecture, 17th-century Garrison and horseracing track. Near the central National Heroes Square, which fringes the Constitution River, Nidhe Israel Synagogue and its museum explore the island’s Jewish history. -wikipedia.org"], 
    ["Marrakesh", "This ancient walled city is home to mosques, palaces and lush gardens. It’s known as The Red City thanks to the color of the brick walls surrounding the city. The medina is a UNESCO World Heritage Centre. -forbes.com"], 
    ["Reykjavik", "The first permanent settlement in Iceland by Norsemen is believed to have been established at Reykjavík by Ingólfr Arnarson around AD 870; this is described in Landnámabók, or the Book of Settlement. Ingólfur is said to have decided the location of his settlement using a traditional Norse method: he cast his high seat pillars (Öndvegissúlur) into the ocean when he saw the coastline, then settled where the pillars came to shore. -wikipedia.org"], 
    ["Kyoto", "About 20% of Japan's National Treasures and 14% of Important Cultural Properties exist in the city proper. The UNESCO World Heritage Site Historic Monuments of Ancient Kyoto (Kyoto, Uji and Otsu Cities) includes 17 locations in Kyoto, Uji in Kyoto Prefecture, and Ōtsu in Shiga Prefecture. The site was designated as World Heritage in 1994. -wikipedia.org"], 
    ["Tromso", "The city centre of Tromsø contains the highest number of old wooden houses in Northern Norway, the oldest house dating from 1789. The city is a cultural centre for its region, with several festivals taking place in the summer. Torbjørn Brundtland and Svein Berge of the electronica duo Röyksopp and Lene Marlin grew up and started their careers in Tromsø. -wikipedia.org"]];


// loop through destinations individually to feed into ajax
vacayApp.destinationsCycle = () => {
    vacayApp.destinations.forEach((location) => {
        // vacayApp.getDestWeather(location[0]);
        // replaced above with more reusable promise
        vacayApp.weatherPromise(location[0], "observation")
        .then( (result) => {
            const vacayArray = result.observations.location[0];
            vacayApp.displayVacay(vacayArray, vacayApp.userSelect, location[1]);
        });
    });
};

// display the vacations onto the page 
vacayApp.displayVacay = (vacay, userSelection, cityInfo) => { //this needs to take data from two different places

    // display city
    const city = vacay.city;
    // disp country
    const country = vacay.country;
    // disp weather (average temperature)
    const temp = Math.floor((parseInt(vacay.observation[0].highTemperature) + parseInt(vacay.observation[0].lowTemperature)) / 2);
    // Weather api has a weather description which can be helpful for our needs
    const tempDesc = vacay.observation[0].temperatureDesc;

    // if statements to populate list to user
    // below is testing. needs updating on html completion
    if (userSelection === tempDesc ||
    userSelection === "Cool" && tempDesc === "Cool" ||
    userSelection === "Cool" && tempDesc === "Refreshingly cool" ||
    userSelection === "Cool" && tempDesc === "Quite cool" ||
    userSelection === "Cool" && tempDesc === "Frigid" ||
    userSelection === "Cool" && tempDesc === "Chilly") {
        
        // vacayApp.mapPromise(city)
        // .then( (result) => {
        //     // trying to display map image but the responseText is literally an image. don't know how to use it
        //     console.log(result);
        // // use mapPromise endpoint as img src

        // // console.log(vacayApp.mapPromise(city));

        // }).fail ( (err1, err2) => {
        //   console.log("fack", err1);
        //   console.log("shiet", err2);
        // });
        
        vacayApp.weatherPromise(city, "forecast_7days")
        .then( (result) => {
            const forecastsArray = result.forecasts.forecastLocation.forecast;
            
            // Povidencia is 26C but is cool. ???
            const resultsHtml = `
                <button id ="${city}" class="${country} mapGrab">${city}, ${country}</button>                
                <p>The current average temperature is ${temp}</p>
                <p>${cityInfo}</p>`;

                //static map as a fall back 
                // <img src="https://image.maps.ls.hereapi.com/mia/1.6/?apiKey=${vacayApp.hereApiKey}&ci=${city}&nocp" alt="" class="mapHidden">
            
            const linksHtml = `
                <li><button class="${country}">${city}</button></li>`;

            $(".displayResults").append(resultsHtml);

            //need to call the click function b/c you can't select the class of the appended elements above otherwise. Solved by moving class of city to an ID to make it unique to grab via attr.
            // we could move this click to the map nav along with initializing the map so it only runs once instead of repeating on every click here
            vacayApp.click();
            vacayApp.mapInit();
        });

    } else if (userSelection != tempDesc) {
        // nothing happens if the temperature doesn't match the selected temp
    } else {
        console.log("type while (safi is old) console.log('fuuuuuck')"); // error
    }
}


// we need to take the name of the clicked item, use it to run an ajax call to grab it's lat and long which we then push to mapInit and moveMap. May combine those two depending on how we want the map to first appear.
// COMPLETED - still need to init map somewhere.
vacayApp.click = () => {
  $(".mapGrab").on("click", function() {
    cityClick = $(this).attr("id");
  
    // scroll to map area on click see to be broken as in it bounces around
    $('html, body').animate({
      scrollTop: $('.mapResults').offset().top,
    }, 300, 'linear');

    vacayApp.weatherPromise(cityClick, "observation")
    .then( (result) => {
        const lat = result.observations.location[0].latitude;
        const long = result.observations.location[0].longitude;
        //move map function
        vacayApp.moveMap(lat, long)
        
      });
    });
  };
    $(".mapNav").on("click", function() {
      vacayApp.mapInit();
    })

// ajax call to run our cities through to get the array data from.
vacayApp.getDestWeather = (input) => {
    $.ajax({
        url: vacayApp.hereURL,
        method: "GET",
        dataType: "json",
        data: {
            apiKey: vacayApp.hereApiKey,
            product: "observation",
            name: input,
            nocp: true
        }
    }).then((result) => {
        const vacayArray = result.observations.location[0];
        vacayApp.displayVacay(vacayArray, vacayApp.userSelect);
    });
};

// is it possible to make above more reusable by saving into promise?
vacayApp.weatherPromise = (city, product) => {
    return $.ajax({
        url: vacayApp.hereURL,
        method: "GET",
        dataType: "json",
        data: {
            apiKey: vacayApp.hereApiKey,
            product: product,
            name: city,
            nocp: true
        }
    });
}

// need city id to input into ajax to get restaurants
vacayApp.zomatoCityID = (city) => {
  return $.ajax({
    url: vacayApp.zomatoCityURL,
    method: "GET",
    dataType: "json",
    headers: {
      "user-key": vacayApp.zomatoApiKey
    },
    data: {
      q: city,
    }
  }).then ( (result) => {
    vacayApp.cityID = result.location_suggestions[0].id;
    vacayApp.zomatoRestaurants(vacayApp.cityID);
  });
};

vacayApp.zomatoRestaurants = (cityID) => {
  return $.ajax({
    url: vacayApp.zomatoEstablishmentURL,
    method: "GET",
    dataType: "json",
    headers: {
      "user-key": vacayApp.zomatoApiKey
    },
    data: {
      city_id: cityID,
    }
  }).then((result) => {
    console.log(result);
    
  });
};

// Below code note needed anymore, leaving for posterity. Delete on final

// maps promise for later.
// maybe we should cut the map. they look so ugly
// vacayApp.mapPromise = (city) => {
//     return $.ajax({
//         url: vacayApp.hereMapURL,
//         method: "GET",
//         dataType: "json",
//         data: {
//             apiKey: vacayApp.hereApiKey,
//             ci: city,
//             // lat: latitude,
//             // lon: longitude,
//             // vt: "0",
//             // z: "14"
//         }
//     });
//   }


// below code is directly from here.com api docs modifications done as necessary
// call below to init the map
vacayApp.mapInit = () => { 
  // Updated var to const, some namespace was used during testing for better manipulation
  const platform = new H.service.Platform({
    apikey: vacayApp.hereApiKey
  });
  const defaultLayers = platform.createDefaultLayers();

  // need to empty it for testing as it duplicates if you dont
  $("#map").empty();

  vacayApp.map = new H.Map(document.getElementById('map'),
    defaultLayers.vector.normal.map, {
    center: { lat: 0, lng: 0 },
    zoom: 1,
    pixelRatio: window.devicePixelRatio || 1
  });

  window.addEventListener('resize', () => vacayApp.map.getViewPort().resize());
  
  const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(vacayApp.map));
  
  const ui = H.ui.UI.createDefault(vacayApp.map, defaultLayers);

}  

// call this to move the map
vacayApp.moveMap = (latt, long) => {
  vacayApp.map.setCenter({ lat: latt, lng: long });
  vacayApp.map.setZoom(13);
}

// -------------------
// init
// -------------------
vacayApp.init = () => {
    $("main").hide();
    // $(".sideNav").fadeIn(); //testing purposes
    // user select portion
    $(".imgSelection").on("click", function() {
        $("main").show();
        $(".sideNav").fadeIn();

        vacayApp.userSelect = $(this).val();
        vacayApp.destinationsCycle();
        // dynamic hover color on <a> tags: 

        $("a").hover( function(e) {
            let dynamicColor = '';
            
            if (vacayApp.userSelect === "Cool") {
                dynamicColor = '#69CDE7';
            } else if (vacayApp.userSelect === "Mild") {
                dynamicColor = '#F8971D';
            } else if (vacayApp.userSelect === "Warm") {
                dynamicColor = '#ED2024';
            }
            
            $(this).css("border-bottom", `5px solid ${e.type === "mouseenter"?`${dynamicColor}`:"transparent"}`);
        });
        
        // dynamic color for nav line:
        // can't use $(".pageNav::after").css(); because jQ can't select ::after
        $(".pageNav").removeClass().addClass("pageNav")
            .toggleClass(`nav${vacayApp.userSelect}`);

        $(".displayResults").empty();
        $(".innerNav").empty();
        $(".userSelected").text(`${vacayApp.userSelect} Places:`);

        // scroll down to content and show hidden nav
        $('html, body').animate({
            scrollTop: $('.resultsContainer').offset().top,
        }, 300, 'linear');
    });

    // click listener on innerNav (cities)
    $(".innerNav").on("click", "button", function() {
        // show different info for diff cities
    });
}
// -------------------
// doc ready
// -------------------
$(()=> {
    vacayApp.init();
    vacayApp.mapInit();
})