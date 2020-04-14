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


const vacayApp = {};

vacayApp.hereApiKey = `Cl4BqeFBq-GNBKFZC1Nz9Ux12AiOXdtj6r2EG-CWSdY`;

// -------------------
// init
// -------------------
vacayApp.init = () => {

}
// -------------------
// doc ready
// -------------------
$(()=> {
    console.log('doc ready test');
})