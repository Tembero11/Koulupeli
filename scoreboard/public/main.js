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

let score = 50;
function loadScores() {
  const scoreboard = document.getElementById("scoreboard");
  for (let i = 1; i <= 5; i++) {
    const html = createScoreboardUserHTML("User " + i, score += Math.round(Math.random() * 7));
    scoreboard.prepend(html);
  } 
}
loadScores();