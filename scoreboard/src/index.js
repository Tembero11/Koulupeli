const express = require("express");
const fs = require("fs");
const path = require("path");
const {getScoreboardFilepath, updateScoreboard} = require("./utils");


// Create data directory
const dataPath = path.join(process.cwd(), "data");
if (!fs.existsSync(dataPath)) fs.mkdirSync(dataPath);

// Create the empty scoreboard file if not found
const scoreboardPath = getScoreboardFilepath();
if (!fs.existsSync(scoreboardPath)) {
  updateScoreboard({entries: []});
}

const app = express();
const PORT = 5000;

app.use(express.static("public"));


module.exports = { app };

require("./routes");

app.listen(PORT);