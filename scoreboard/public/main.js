function fetchScoreboard() {
  
}

function createScoreboardUserHTML(username, score) {
  const rootElement = document.createElement("li");
  rootElement.className = "scoreboard-user"
  const innerHTML = [
    '<div class="placing"></div>',
    `<div class="score-badge">`,
    `<span class="score">${score}</span>`,
    `<span class="pts">pts</span>`,
    `</div>`,
    `<span>${username}</span>`,
  ].join("\n");

  rootElement.innerHTML = innerHTML;

  return rootElement;
}

// Testing...

async function loadScores() {

  const url = `http://${window.location.host}/api/v1/scoreboard/0/10`;
  
  try {
    const res = await fetch(url);
    const { entries } = (await res.json());

    for (let i = 0; i < entries.length; i++) {
      const { username, score } = entries[i];
      const html = createScoreboardUserHTML(username, score);
      scoreboard.appendChild(html);  
    }
  } catch (err) {
  }
}
loadScores();