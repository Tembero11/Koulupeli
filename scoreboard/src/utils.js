const fs = require("fs");
const path = require("path");

function getScoreboardFilepath() {
  return path.join(process.cwd(), "data", "scoreboard.json");
}

function readScoreboard() {
  const scoreboardFilePath = getScoreboardFilepath();
  return JSON.parse(fs.readFileSync(scoreboardFilePath, "utf-8"));
}

function updateScoreboard(newData) {
  const scoreboardFilePath = getScoreboardFilepath();
  fs.writeFileSync(scoreboardFilePath, JSON.stringify(newData), {encoding: "utf-8"});
}


function strToInteger(str) {
  if (/^[0-9]+$/.test(str)) {
    return +str;
  }

  return null;
}


module.exports = {
  getScoreboardFilepath,
  readScoreboard,
  updateScoreboard,
  strToInteger
}