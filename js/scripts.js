const vacayApp = {}; // namespace

vacayApp.hereApiKey = `Cl4BqeFBq-GNBKFZC1Nz9Ux12AiOXdtj6r2EG-CWSdY`;
vacayApp.hereURL = `https://weather.ls.hereapi.com/weather/1.0/report.json`;

vacayApp.hereMapURL = `https://image.maps.ls.hereapi.com/mia/1.6/mapview`;

vacayApp.zomatoApiKey = `b655786c25f1fdb7949ffd2d5bb49eb6`;
vacayApp.zomatoCityURL =`https://developers.zomato.com/api/v2.1/cities`;
vacayApp.zomatoCollectionsURL = `https://developers.zomato.com/api/v2.1/collections`;

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
vacayApp.destinationsCycle = function() {
    vacayApp.destinations.forEach(function(location) {
        vacayApp.weatherPromise(location[0], "observation")
        .then( function(result) {
            const vacayArray = result.observations.location[0];
            vacayApp.displayVacay(vacayArray, vacayApp.userSelect, location[1]);
        });
    });
};

// display the vacations onto the page 
vacayApp.displayVacay = function(vacay, userSelection, cityInfo) { 
    //this needs to take data from different places

    const city = vacay.city;
    const country = vacay.country;
    const tempDesc = vacay.observation[0].temperatureDesc;
    // disp weather (average temperature)
    const temp = Math.floor((parseInt(vacay.observation[0].highTemperature) + parseInt(vacay.observation[0].lowTemperature)) / 2);
    // if statements to populate list to user
    if ( 
    tempDesc.toLowerCase().includes(userSelection.toLowerCase()) ||
    userSelection === "Warm" && tempDesc.toLowerCase().includes("hot") ||
    userSelection === "Cool" && tempDesc === "Cool" ||
    userSelection === "Cool" && tempDesc === "Refreshingly cool" ||
    userSelection === "Cool" && tempDesc === "Quite cool" ||
    userSelection === "Cool" && tempDesc === "Frigid" ||
    userSelection === "Cool" && tempDesc === "Chilly"
    ) {
        const resultsHtml = `
            <h3 class="${city} ${country}">${city}, ${country}</h3>
            <p>The current average temperature is ${temp}°C</p>
            <p>${cityInfo}</p>`;
        
        const linksHtml = `
            <li><button class="${city}">${city}</button></li>`;

        $(".displayResults").append(resultsHtml);
        $(".innerNav").append(linksHtml);
        
        // set a default for forecasts
        vacayApp.displayForecasts(city);
        // set default map
        vacayApp.moveMap(vacay.latitude, vacay.longitude);
        // set default food
        vacayApp.zomatoCityID(city);
        

    } else if (userSelection != tempDesc) {
        // nothing happens if the temperature doesn't match the selected temp
    } else {
        console.log("type while (safi is old) console.log('fuuuuuck')"); // error
        
    }
}

vacayApp.displayForecasts = function(city) {
    vacayApp.weatherPromise(city, "forecast_7days_simple").then( function(result) {
        const forecastsArray = result.dailyForecasts.forecastLocation.forecast;

        const legendHtml = `
        <li class="legendColumn dayOfWeek">
            <ul>
                <li></li>
                <li>
                    <h4>°C</h4>
                </li>
                <li>
                    <h4>UV</h4>
                </li>
                <li>
                    <h4>Wind <span>(km/h)</span></h4>
                </li>
                <li></li>
            </ul>
        </li>`;

        $(".userSelectedCity").text(city);
        $(".sevenDayForecast").empty();
        $(".sevenDayForecast").append(legendHtml);

        // forEach to go through each day and spit out data
        forecastsArray.forEach( function(day) {
            const { 
                highTemperature, lowTemperature, skyDescription, 
                uvIndex, utcTime, weekday, windSpeed } =  day;
            
            const avgTemp = (parseInt(lowTemperature) + parseInt(highTemperature)) / 2;
            const windInt = Math.round(parseInt(windSpeed));

            const forecastHtml = `
                <li class="${weekday}Column dayOfWeek">
                    <ul>
                        <li>
                            <h3>${weekday.substr(0, 3)}</h3>
                            <p>${utcTime.substr(5, 5)}</p>
                        </li>
                        <li>
                            <h4>${avgTemp}°</h4>
                        </li>
                        <li>
                            <h4>${uvIndex}</h4>
                        </li>
                        <li>
                            <h4>${windInt}</h4>
                        </li>
                        <li>
                            <p>${skyDescription}</p>
                        </li>
                    </ul>
                </li>`;
    
            $(".sevenDayForecast").append(forecastHtml);
            
        });
        
    }).fail( function(error) {
        console.log('safi broke it!', error);
    });
}

// take the name of the clicked item, use it to run an ajax call to grab it's lat and long
vacayApp.innerNavClick = function() {
    // click listener on innerNav (cities)
    $(".innerNav").on("click", "button", function() {
        const cityClick = $(this).text();
        // show different forecasts for diff cities
        vacayApp.displayForecasts(cityClick);
        
        // move the map to the clicked city
        vacayApp.weatherPromise(cityClick, "observation")
        .then( function(result) {
            const lat = result.observations.location[0].latitude;
            const long = result.observations.location[0].longitude;
            //move map function
            vacayApp.moveMap(lat, long);            
        });
        // change restaurant info to clicked city
        vacayApp.zomatoCityID(cityClick);
    });
};

// promise from HERE weather api
vacayApp.weatherPromise = function(city, product) {
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

// need city id to input into ajax to get establishments (types of restaurants)
vacayApp.zomatoCityID = function(city) {
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
    }).then ( function(result) {
        if (result.location_suggestions.length === 0) {
            const resultsHtml = `<p>Sorry Zomato doesn't have information on this location</p>`;
            $(".restaurantResults").empty();
            $(".restaurantResults").append(resultsHtml);
            
        } else {
            vacayApp.cityID = result.location_suggestions[0].id;
            vacayApp.zomatoCollections(vacayApp.cityID);
        
        }
    });
};

// Using zomato's built in collections (best of) reviews
vacayApp.zomatoCollections = function(cityID) {
    return $.ajax({
        url: vacayApp.zomatoCollectionsURL,
        method: "GET",
        dataType: "json",
        headers: {
            "user-key": vacayApp.zomatoApiKey
            },
            data: {
            city_id: cityID,
            }
    }).then(function(result) {
            vacayApp.collectionsList = result.collections;
            vacayApp.collectionsToPage(vacayApp.collectionsList);

    }).fail(function(error) {
        console.log("zomato error", error);
    });
};

vacayApp.collectionsToPage = function(input) {
    $(".restaurantResults").empty();

    input.forEach( function(input) {
        const collectionImg = input.collection.image_url;
        const collectionDescription = input.collection.description;
        const collectionURL = input.collection.share_url;

        const resultsHtml = `
        <div class = "restaurantCard">
            <h2>${collectionDescription}</h2>
            <a href="${collectionURL}">
                <img alt="${collectionDescription}" src="${collectionImg}">
            </a>
        </div>`;

        $(".restaurantResults").append(resultsHtml);
    });

}

// below code is directly from here.com api docs modifications done as necessary
// call below to init the map
vacayApp.mapInit = function() { 
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
vacayApp.moveMap = function(latt, long) {
    vacayApp.map.setCenter({ lat: latt, lng: long });
    vacayApp.map.setZoom(13);
}

// -------------------
// init
// -------------------
vacayApp.init = function() {
    vacayApp.innerNavClick(); // handles clicks on inner nav
    vacayApp.mapInit(); // start map section

    $("main").hide();
    // $(".sideNav").fadeIn(); //testing purposes
    // user select portion
    $(".imgSelection").on("click", function() {
        $("main").show();
        $(".sideNav").fadeIn();

        vacayApp.userSelect = $(this).val();
        vacayApp.destinationsCycle();
        // dynamicColors
        let dynamicColor = '';
        
        if (vacayApp.userSelect === "Cool") {
            dynamicColor = '#69CDE7';

        } else if (vacayApp.userSelect === "Mild") {
            dynamicColor = '#F8971D';

        } else if (vacayApp.userSelect === "Warm") {
            dynamicColor = '#ED2024';

        }
        // a tags hover dynamic colors
        $("a").hover( function(e) {
            $(this).css("border-bottom", 
            `5px solid ${e.type === "mouseenter"?`${dynamicColor}`:"transparent"}`);
        });
        // hamburger dynamic colors
        $(".hamburger-lines:nth-child(3)").css("background", `${dynamicColor}`);
        // dynamic color for nav line:
        // can't use $(".pageNav::after").css(); because jQ can't select ::after
        $(".pageNav").removeClass().addClass("pageNav")
            .toggleClass(`nav${vacayApp.userSelect}`);

        $(".displayResults").empty();
        $(".innerNav").empty();
        $(".userSelected").text(`${vacayApp.userSelect} Places:`);

        // scroll down to content
        $('html, body').animate({
            scrollTop: $('.resultsContainer').offset().top,
        }, 300, 'linear');
    });
}
// -------------------
// doc ready
// -------------------
$(function() {
    vacayApp.init();
})