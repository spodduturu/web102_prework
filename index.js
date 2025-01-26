/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // Clear the games container first, if needed
    gamesContainer.innerHTML = "";

    // Loop over each item in the data
    for (let game of games) {
        // Create a div element to hold a game card
        const gameCard = document.createElement("div");
        gameCard.classList.add("game-card");

        // Check if the game has a valid image URL
        const gameImage = game.img ? `<img src="${game.img}" alt="${game.name}" style="width: 100%; height: auto;" />` : "";

        // Set the inner HTML of the game card
        gameCard.innerHTML = `
            <h3>${game.name}</h3>
            <p>${game.description}</p>
            ${gameImage}
            <p>Goal: $${game.goal.toLocaleString()}</p>
            <p>Pledged: $${game.pledged.toLocaleString()}</p>
        `;

        // Append the game card to the games container
        gamesContainer.appendChild(gameCard);
    }
}

// Call the function to add all games to the page
addGamesToPage(GAMES_JSON);




/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((total, game) => total + game.backers, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString()} contributions`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");

gamesCard.innerHTML = `${GAMES_JSON.length} games`;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // Use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Log the count of unfunded games (Secret key component)
    console.log(`Number of unfunded games: ${unfundedGames.length}`);


}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // Use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);

    // Log the count of funded games
    console.log(`Number of funded games: ${fundedGames.length}`);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // Add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

    // Log the total number of games
    console.log(`Total number of games: ${GAMES_JSON.length}`);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter to count the number of unfunded games
const unfundedGamesCount = GAMES_JSON.filter(game => game.pledged < game.goal).length;

// calculate the total number of games
const totalGames = GAMES_JSON.length;

// create a string that explains the number of unfunded games using the ternary operator
const descriptionText = `We have a total of ${totalGames} ${
  totalGames === 1 ? "game" : "games"
}, and ${unfundedGamesCount} ${
  unfundedGamesCount === 1 ? "game remains" : "games remain"
} unfunded. Please consider supporting these amazing projects!`;

// create a new DOM element containing the template string
const descriptionElement = document.createElement("p");
descriptionElement.textContent = descriptionText;

// append the new element to the description container
descriptionContainer.appendChild(descriptionElement);


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

// Sort the games by the amount pledged in descending order
const sortedGames = GAMES_JSON.sort((item1, item2) => item2.pledged - item1.pledged);

// Use destructuring to grab the first and second games
const [firstGame, secondGame] = sortedGames;

// Create a new element for the top game, then append it to the first game container
const firstGameElement = document.createElement("p");
firstGameElement.textContent = `${firstGame.name} - $${firstGame.pledged.toLocaleString()} pledged`;
firstGameContainer.appendChild(firstGameElement);

// Create a new element for the second game, then append it to the second game container
const secondGameElement = document.createElement("p");
secondGameElement.textContent = `${secondGame.name} - $${secondGame.pledged.toLocaleString()} pledged`;
secondGameContainer.appendChild(secondGameElement);
