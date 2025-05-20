const TEAM_ID = '133612';
const API_KEY = '3'; // TheSportsDB free test API key
const NUM_GAMES_TO_DISPLAY = 3;
const AUTO_CLOSE_TIMEOUT = 15000; // 15 seconds

const fixturesContainer = document.getElementById('fixtures-container');

async function fetchNextGames(teamId, apiKey) {
  const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnext.php?id=${teamId}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.events; // The API returns events under the "events" key
  } catch (error) {
    console.error("Error fetching next games:", error);
    displayError("Could not fetch game data. Please check your connection or try again later.");
    return null;
  }
}

function displayGames(gamesData) {
  if (!fixturesContainer) {
    console.error("Fixtures container not found");
    return;
  }
  fixturesContainer.innerHTML = ''; // Clear loading message

  if (!gamesData || gamesData.length === 0) {
    displayError("No upcoming games found for Manchester United.");
    return;
  }

  const gamesToShow = gamesData.slice(0, NUM_GAMES_TO_DISPLAY);

  gamesToShow.forEach(game => {
    const gameElement = document.createElement('div');
    gameElement.classList.add('fixture-item');

    const eventName = game.strEvent || "Unknown Event";
    const league = game.strLeague || "N/A";
    const eventDate = game.dateEvent || "Unknown Date";
    let eventTime = game.strTime || "";

    // Format time if available (e.g., remove seconds)
    if (eventTime && eventTime.includes(':')) {
        const timeParts = eventTime.split(':');
        eventTime = `${timeParts[0]}:${timeParts[1]}`;
    }


    gameElement.innerHTML = `
      <h3>${eventName}</h3>
      <p>${league}</p>
      <p>${eventDate} at ${eventTime}</p>
    `;
    fixturesContainer.appendChild(gameElement);
  });
}

function displayError(message) {
  if (!fixturesContainer) {
    console.error("Fixtures container not found, cannot display error:", message);
    return;
  }
  fixturesContainer.innerHTML = `<p>${message}</p>`;
}

document.addEventListener('DOMContentLoaded', async () => {
  const games = await fetchNextGames(TEAM_ID, API_KEY);
  if (games) {
    displayGames(games);
  }
  // Regardless of success or failure, set timeout to close
  setTimeout(() => {
    window.close();
  }, AUTO_CLOSE_TIMEOUT);
});
