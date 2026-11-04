const TEAM_ID = '133612';
const API_KEY = '3'; // TheSportsDB free test API key
const NUM_GAMES_TO_DISPLAY = 3;
const AUTO_CLOSE_TIMEOUT = 15000; // 15 seconds

const fixturesContainer = document.getElementById('fixtures-container');

async function fetchNextGames(teamId, apiKey) {
  const url = `https://www.thesportsdb.com/api/v1/json/${apiKey}/eventsnext.php?id=${teamId}`;
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.events !== null && (!Array.isArray(data.events) || data.events.some(event => !event || typeof event !== 'object'))) throw new Error('Invalid fixture response');
    return data.events || []; // The API returns events under the "events" key
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


    for (const [tag, text] of [["h3", eventName], ["p", league], ["p", `${eventDate} at ${eventTime}`]]) {
      const element = document.createElement(tag);
      element.textContent = text;
      gameElement.appendChild(element);
    }
    fixturesContainer.appendChild(gameElement);
  });
}

function displayError(message) {
  if (!fixturesContainer) {
    console.error("Fixtures container not found, cannot display error:", message);
    return;
  }
  fixturesContainer.replaceChildren();
  const error = document.createElement("p");
  error.className = "error-message";
  error.setAttribute("role", "status");
  error.textContent = message;
  fixturesContainer.appendChild(error);
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
